
import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../components/Firebase';
import { signInWithPopup } from "firebase/auth";
export default function Login() {
    const signIn = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // ...
                console.log(result);
            }).catch((error) => {
                // Handle Errors here.
                console.log(error)
                // ...

            });
    }

    return (
        <LoginContainer>
            <LoginInnerContainer className="inside_login">
                <img
                    src="images/logo.png"
                    alt="tshirt "
                />
                <h1>Sign in</h1>
                <p>Your Own T-Shirt Design App</p>
                <Button onClick={signIn}>Sign in with google</Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  display: flex;
    justify-content: center;
    align-items: center;
`
const LoginInnerContainer = styled.div`
padding: 20px 7px 30px 7px;
  text-align:center;
  background-color: white;
  border-radius: 10px;
  box-shadow:  rgba(0, 0, 0, 0.35) 0px 5px 15px,rgba(0, 0, 0, 0.35) 0px 5px 15px;;
  width: 25%;
  >img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: transparent !important;
    color: #000;
    border:2px solid  #DF0803;
  }

  @media (max-width: 768px) {
    width: 70vw !important;
    margin-top: -40px;
  }
`