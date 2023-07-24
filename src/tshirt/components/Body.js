import React, { useRef, useState } from 'react';
import '../css/Body.css';
import { HexColorPicker } from "react-colorful";
import { Avatar, Button, FormControlLabel, Radio, RadioGroup, Slider, Tooltip } from '@mui/material';
import { useScreenshot, createFileName } from "use-react-screenshot";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth"


function Body() {
    const [color, setColor] = useState("#aabbcc");
    const [tatoocolor, setTatoocolor] = useState("#4e565e");
    const [coloropacity, setcoloropacity] = useState(0.5)
    const [tatooopacity, settatooopacity] = useState(0.5)
    const [size, setSize] = useState('S');
    const [selectedTatoo, setSelectedTatoo] = useState('')
    const [finalTatoo, setFinalTatoo] = useState('')
    const [enableTatooSize, setEnableTatooSize] = useState(false)
    const tshirt = useRef()
    const tshirtBG = useRef()



    /*  for handle change on size radio buttons */
    const hanleChange = (e) => {
        setSize(e.target.value)
    }


    /*  for start draging tatoo from slider to tshirt */
    const dragStart = (e) => {
        const data = e.target.src;
        setSelectedTatoo(data)
    }

    /* fort drop tatoo from slider to tshirt */
    const drop = (e) => {
        e.preventDefault();
        setFinalTatoo(selectedTatoo)
    }

    /* allow tshirt tatoo area to drop tatoo image */
    const allowDrop = (e) => {
        e.preventDefault();
        // setFinalTatoo('')
    }

    window.onload = function () {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("selectedTatoo");
        ctx.drawImage(img, 10, 10);
    }

    const [image, takeScreenShot] = useScreenshot({
        type: "image/png",
        quality: 1.0
    });

    const downloadContent = (image, { name = "img", extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };

    /* for controling opacity of tshirt color */
    const changeColorOpacity = (e) => {
        setcoloropacity(e.target.value)
    }

    /* for controling opacity of tatoo color */
    const changetatooOpacity = (e) => {
        settatooopacity(e.target.value)
    }

    const download = () => {
        console.log("start download");
        window.print()
        //takeScreenShot(tshirt.current).then(downloadContent);
    }


    /* for remove tatto from tshirt */
    const removeTatoo = () => {
        setFinalTatoo('');
    }

    const header = document.getElementById('tatooArena')
    const tshirtSizes = ["S", "L", "XL", "M", "XXL", "XXXL"];
    const tatoos = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png"];

    function onDrag({ movementX, movementY }) {
        let getStyle = window.getComputedStyle(header);
        let leftVal = parseInt(getStyle.left);
        let topVal = parseInt(getStyle.top);
        header.style.left = `${leftVal + movementX}px`;
        header.style.top = `${topVal + movementY}px`;
    }
    const handleMouseDown = () => {
        header.classList.add("active__move");
        header.addEventListener("mousemove", onDrag);
    }

    const handleMouseUp = () => {
        header.classList.remove("active__move");
        header.removeEventListener("mousemove", onDrag);
    }

    const handleTatooSize = () => {
        if (enableTatooSize) {
            header.classList.remove("resize__area")
            setEnableTatooSize(false);
        } else {
            header.className += "  resize__area";
            setEnableTatooSize(true);
        }
    }

    const [user] = useAuthState(auth);
    const signOut = () => {
        auth.signOut();
    }
    return (
        <>
            <div className="container-fluid">
                <div style={{ position: "relative" }}>
                    <Tooltip title="Sign Out">
                        <Avatar onClick={signOut} id="avatar" alt={user?.displayName} src={user?.photoURL} />
                    </Tooltip>
                    <div className="card row" >
                        <div className="image col-sm-4 my-5" >
                            <div ref={tshirt} id="section-to-print">
                                <img id="tshirt" src="./images/bgTshirt.jpg" ref={tshirtBG} style={{ filter: `opacity(${coloropacity}) drop-shadow(0 0 0 ${color})` }} alt="tshirt" />
                                <label className="img-label">{size}</label>

                                <div className="row">
                                    <div id="tatooArena" className={finalTatoo.length > 0 ? "tatooarea " : "droparea"}
                                        style={tatoocolor === "#ffffff" ? { backgroundImage: `url(${finalTatoo})`, filter: "invert(100%)" } : { backgroundImage: `url(${finalTatoo})`, filter: `opacity(${tatooopacity}) drop-shadow(0 0 0 ${tatoocolor})` }}
                                        onDrop={drop} onDragOver={allowDrop}  >

                                        {enableTatooSize && <header onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} ></header>}

                                        <img id="selectedTatoo" height="120%" width="100%" src={finalTatoo} className="tatoo__img mt-5" alt="tatoo" style={{ filter: `opacity(${tatooopacity}) drop-shadow(0 0 0 ${tatoocolor})` }} />
                                    </div>
                                </div>
                            </div>
                            <div className="buttons__container">
                                {/* <Button onClick={download} className="mt-3 mx-2" variant="contained">Download</Button> */}
                                <Button onClick={download} className="mt-3 mx-2" variant="contained">Download</Button>
                                {finalTatoo.length > 0 && <>
                                    <Button onClick={removeTatoo} className="mt-3 mx-2" variant="contained">remove tatoo</Button>
                                    <Button onClick={handleTatooSize} className="mt-3 mx-2" variant="contained">{enableTatooSize ? "done" : "Change tatoo size"}</Button>
                                </>}
                            </div>
                        </div>

                        <div className="container card__container col-sm-8 my-5">
                            <h3 className="title">Tatoo (drag and drop on the t-shirt)</h3>
                            <div className="marks row">
                                {tatoos.map((element, key) => {
                                    return <div className="col-sm-2" key={key}>
                                        <img src={`./images/tatoos/${element}`} alt="tatoos" onDragStart={dragStart} /> </div>
                                })}
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3 className="title mt-3">Color</h3>
                                    <div className="color__peaker">
                                        <section className="responsive example">
                                            <HexColorPicker color={color} onChange={setColor} />
                                        </section>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2 mt-1">
                                            <h6>Opacity</h6>
                                        </div>
                                        <div className="col-sm-9">
                                            <Slider
                                                aria-label="opacity"
                                                defaultValue={0.5}
                                                valueLabelDisplay="auto"
                                                step={0.1}
                                                marks
                                                min={0}
                                                max={1}
                                                onChange={changeColorOpacity}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <h3 className="title mt-3">Tatoo color</h3>
                                    <div className="color__peaker">
                                        <section className="responsive example">
                                            <HexColorPicker color={tatoocolor} onChange={setTatoocolor} />
                                        </section>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2 mt-1">
                                            <h6>Opacity</h6>
                                        </div>
                                        <div className="col-sm-9">
                                            <Slider
                                                aria-label="opacity"
                                                defaultValue={0.5}
                                                valueLabelDisplay="auto"
                                                step={0.1}
                                                onChange={changetatooOpacity}
                                                marks
                                                min={0}
                                                max={1}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="title mt-3">Size</h3>
                            <div className="sizes">
                                <ul className="sizepick">
                                    <RadioGroup
                                        defaultValue={size}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        {tshirtSizes.map((item, index) => {
                                            return <FormControlLabel key={index} onChange={hanleChange} value={item} control={<Radio />} label={item} />
                                        })}
                                    </RadioGroup>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Body