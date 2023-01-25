import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


const AddData = () => {

    const {tokens}  = useContext(AuthContext);
    let navigator = useNavigate();

    const addData = async (e)=>{
        e.preventDefault()
        let resp = await fetch(
            `/add/`,{
            method :"POST",
            headers :{
                'Content-type':'application/json',
                'Authorization' : `Bearer ${tokens.access}`
            },
            body : JSON.stringify({'income':e.target.income.value,'note':e.target.note.value})
        
        })

        navigator('/income')

    }

  return (

    <div>

        <form onSubmit={addData}>
            <input placeholder='income' type='int' name= 'income' />
            <br></br>
            <input placeholder='note' type='text' name= 'note' /> 
            <br></br>
            <input type='submit' /> 
        </form>

    </div>
  )
}

export default AddData