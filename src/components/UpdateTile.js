import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const UpdateTile = (props) => {

    let navigator = useNavigate();
    let {id} = useParams();
    let {tokens} = useContext(AuthContext);
    let [data,setmyData] = useState([]);
    const location = useLocation();

    useEffect(()=>{setmyData(data = location.state.data)
    
    },[])
    
    

    const setData = async (e) =>{
        e.preventDefault();
        
        let resp = await fetch(`/update/?q=${id}`,{

            method : "PUT",
            headers :{'Content-Type':'application/json',
                      'Authorization' : `Bearer ${tokens.access}`
                },
            body :JSON.stringify({ income: e.target.income.value, note : e.target.note.value }) 

        })

        let data = await resp.json();
        
        navigator('/income');

    }

  return (
    <div>

        <form  onSubmit={setData}>

            <input defaultValue={data.income} placeholder= "amount" name ='income' ></input><br></br>
            <input defaultValue={data.note} placeholder= "amount" name = 'note'></input>

            <input type='submit' ></input>
 


        </form>


    </div>
  )
}

export default UpdateTile