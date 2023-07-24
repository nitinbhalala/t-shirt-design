import React, { useState } from 'react';
import { Resizable } from "react-resizable";

function Resize() {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);

    const onResize = (event, { element, size }) => {
        console.log(`width ${size.width}`)
        setWidth(size.width);
        setHeight(size.height);
    };
    return (
        <div>
            <div className="layoutRoot">
                <Resizable height={height} width={width} onResize={onResize} >
                    <div
                        className="box"
                        style={{
                            width: `${width} px`,
                            height: `${height} px`,
                            backgroundColor: "red",
                        }}
                    >
                        <img src="https://pngimg.com/uploads/tattoo/tattoo_PNG5473.png" alt="Girl in a jacket" width="500" height="600" />
                    </div>
                </Resizable>
            </div>
        </div >
    )
}

export default Resize