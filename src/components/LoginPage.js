import React, { useContext } from 'react'
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const LoginPage = () => {

    let {name,LoginUser} = useContext(AuthContext);
    let [loginError,setLoginError] = useState(true);

  return (
    <>
        
        <Box>
            
            {loginError?null:<h6>Invalid Credentials </h6>}
        
            <h5>Login to your Account</h5>
            <form onSubmit={LoginUser} >
            <input type='text' name = 'username' placeholder='username'></input>
            <input type='text' name = 'password' placeholder='password'></input>
            <input type ='submit' value='Login' ></input>
            </form>
        </Box>

        <Link to = {`/signup`} style={{ textDecoration: 'none' }}>
            <Box style = {{"marginTop":'2%'}} >
              <h6>Sign Up</h6>
            </Box>    
    
        </Link>

    </>
  )
}

export default LoginPage


const Box = styled.div`
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin:auto;
    margin-top : 7%;
    width : 40vw;
    padding : 1rem;
    text-align: center;
    border-radius : 20px;

    @media (max-width: 768px) {
        width : 90vw;
        margin-top : 15%;
      }

`