import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  let navigator = useNavigate();

  let signUpUser = async (e) =>{
    e.preventDefault();
    let resp = await fetch(
        `/signUp/`,{
        method :"POST",
        headers :{
            'Content-type':'application/json',
        },
        body : JSON.stringify({'name':  e.target.name.value,
                               'mail':  e.target.email.value,
                               'username':  e.target.username.value,
                               'password':  e.target.password.value,
      })
    
    })

    let data=  await resp.json()

    if(resp.status==200){
        alert("Sign Up Successfull")
        navigator('/login')
    }

  }



  return (
    <>
    <Box>

        
            <h5>Sign Up Today !</h5>
        <form onSubmit={signUpUser} >
            <input name = 'email' placeholder='Email' />
            <br/>
            <input name = 'username' placeholder='Username' />
            <br/>
            <input name = 'name' placeholder='Name' />
            <br/>
            <input name = 'password' placeholder='Password' type='password' />
            <br/>

            <input type ='submit' value='Sign Up' ></input>
        </form>
    </Box>

    <Link to = {`/login`} style={{ textDecoration: 'none' }}>
      <Box style = {{"marginTop":'2%'}} >
        <h6>Login</h6>
      </Box>    
    
    </Link>


    </>
  )
}

export default SignUp


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