import './Test.css';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';
import IncomeTile from './IncomeTile';
import MySpinner from './MySpinner';

const Income = () => {

    let {tokens} = useContext(AuthContext);
    
    const [loading,setLoading] = useState(true);
    const [earnings,setEarnings] = useState([]);
    const [status,setStatus] = useState(true);
    const [isupdate,setUpdating] = useState(false);


    const deleteData = async (id)=>{
       let resp = await fetch(`/delete/?q=${id}&a=income`,{

            method : "DELETE",
            headers :{'Content-Type':'application/json',
                      'Authorization' : `Bearer ${tokens.access}`
                },
        })

        setStatus(true)
    }
    

    let getEarnings = async ()=>{
        
        let resp = await fetch(' /earnings/',{
            method : "GET",
            headers :{'Content-Type':'application/json',
                      'Authorization' : `Bearer ${tokens.access}`

        },
            

        })

        
        let data = await resp.json()
        setEarnings(data)
        setLoading(false)
        
    }

    

    const setData = async (id)=>{

        let data = earnings.find(element =>(id == element.id))
        
        let placeIncome = document.getElementById('income')
        let placeNote = document.getElementById('label')

        placeIncome.value = data.note
        placeNote.value = data.income

        let resp = await fetch(
            `/update/?q=${data.id}`,{
            method :"PUT",
            headers :{
                'Content-type':'application/json',
                'Authorization' : `Bearer ${tokens.access}`
            },
            body : JSON.stringify({'income':parseInt(data.income) ,'note':data.note})
        
        })



      // setUpdating(true);
    }

    const addData = async () =>{

        let income = document.getElementById('income').value
        let note = document.getElementById('label').value;

        if(income=='' || note==''){
            alert("Input is incomplete !")
            return;
        }

        let resp = await fetch(
            `/add/?a=income`,{
            method :"POST",
            headers :{
                'Content-type':'application/json',
                'Authorization' : `Bearer ${tokens.access}`
            },
            body : JSON.stringify({'income':parseInt(income) ,'note':note})
        
        })

        setStatus(true)

        document.getElementById('label').value = '';
        document.getElementById('income').value = '';

    }

    

    useEffect(()=>{
        if(status) getEarnings();
        setStatus(false)
        console.log(status)

    },[status])

  return (
    <Cover>

        <AddToggle>

            <h6>Add Transactions </h6>

            <input id = 'label'  placeholder='Note' ></input>
            <input id = 'income' placeholder='Income'></input>
            <Button onClick={addData} ><img src='https://cdn-icons-png.flaticon.com/512/992/992651.png' /> </Button>

        </AddToggle>

       


        {earnings.map((earning,index) => (

            <IncomeTile key={index}  earning = {earning} deleteData = {deleteData} setData = {setData} >

            </IncomeTile>
                
            ))}
        
        { loading ? 
            <MySpinner></MySpinner> 
                : 
                    (earnings.length ?
                        null
                        :
                        <h5>No Income Data !</h5>
                        )  
        }
        

    </Cover>
  )
}

const AddToggle = styled.div`

    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width : 20vw;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : space-between;
    padding : 1rem;
    border-radius : 1rem;
    gap : 0.5rem;

    @media (max-width: 768px) {
        width : 80vw;
        
      }
`


const Cover = styled.div`



    display: flex;
    flex-direction : column;
    align-items : center;
    gap : 1.5rem;

`

const Button = styled.div`

    border-radius : 50%;
    width : 3rem;
    cursor : pointer;
`


export default Income
