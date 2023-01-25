import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export default AuthContext;


export const AuthProvider = ({children}) =>{

    let [tokens,setTokens] = useState(()=>(localStorage.getItem('tokens')?JSON.parse(localStorage.getItem('tokens')):null ));
    let [access,setAccess] = useState(()=>(localStorage.getItem('tokens')? jwt_decode(tokens.access) :null ));

    console.log(tokens);

    let navigateTo = useNavigate();

    let loginUser = async (e) =>{
        e.preventDefault()
        
        let response = await fetch('/api/token/',{

            method : "POST",
            headers :{'Content-Type':'application/json'},
            body : JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            })

        })
        
        if(response.status === 200){

            let data = await response.json();


            setTokens(data)
            setAccess(access = jwt_decode(data.access));
            localStorage.setItem('tokens',JSON.stringify(data));
            navigateTo('/');
        }else{
            return alert('Invalid Login Details !');
        }
        

    }

    const Logout = () =>{

        setAccess(null);
        setTokens(null);
        localStorage.removeItem('tokens')


    }

    let getUserDetails = async ()=>{

        let response = await fetch('/user_details/',{

            method : "GET",
            headers :{'Content-Type':'application/json',
                      'Authorization' : `Bearer ${tokens.access}`},
           
        })
        
        let data = await response.json()
        return data;

    }




    const contextData = {

        LoginUser: loginUser,
        access : access,
        tokens :tokens,
        logoutUser : Logout,
        getUserDetails : getUserDetails
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )



}