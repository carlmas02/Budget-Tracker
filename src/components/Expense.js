import React, { useContext,useState,useEffect } from 'react'
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';
import IncomeTile from './IncomeTile';
import MySpinner from './MySpinner';

const Expense = () => {

  let {tokens} = useContext(AuthContext);

  const [loading,setLoading] = useState(true);
  const [spendings,setSpendings] = useState([]);
  const [status,setStatus] = useState(true);
  const [isupdate,setUpdating] = useState(false);


  const deleteData = async (id)=>{
      console.log(id)
      let resp = await fetch(`/delete/?q=${id}&a=expense`,{

          method : "DELETE",
          headers :{'Content-Type':'application/json',
                    'Authorization' : `Bearer ${tokens.access}`
              },
      })

      setStatus(true)
  }
  

  const setData = async (id,note,value)=>{
        console.log(id)
      let resp = await fetch(
          `/update/?q=${id}&a=expense`,{
          method :"PUT",
          headers :{
              'Content-type':'application/json',
              'Authorization' : `Bearer ${tokens.access}`
          },
          body : JSON.stringify({'value':parseInt(value) ,'note':note})
      
      })



    // setUpdating(true);
  }

  const addData = async () =>{

      let expense = document.getElementById('expense').value
      let note = document.getElementById('label').value;

      if(expense=='' || note==''){
          alert("Input is incomplete !")
          return;
      }

      let resp = await fetch(
          `/add/?a=expense`,{
          method :"POST",
          headers :{
              'Content-type':'application/json',
              'Authorization' : `Bearer ${tokens.access}`
          },
          body : JSON.stringify({'expense':parseInt(expense) ,'note':note})
      
      })

      setStatus(true)

      document.getElementById('label').value = '';
      document.getElementById('expense').value = '';

  }
 

  useEffect(()=>{
      if(status) getSpendings();
      setStatus(false)


  },[status])


    let getSpendings = async ()=>{
        
        let resp = await fetch(' /spendings/',{
            method : "GET",
            headers :{'Content-Type':'application/json',
                      'Authorization' : `Bearer ${tokens.access}`

        },
            

        })

        
        let data = await resp.json()

        setLoading(false);
        setSpendings(data)
    }



  return (
    <>
    
    <Cover>

        
  
        <AddToggle>

            <h6>Add Transactions </h6>

            <input id = 'label'  placeholder='Note' ></input>
            <input id = 'expense' placeholder='Expense'></input>
            <Button onClick={addData} ><img src='https://cdn-icons-png.flaticon.com/512/992/992651.png' /> </Button>

        </AddToggle>


        {spendings.map((earning,index) => (

            <IncomeTile setStatus = {setStatus} setData= {setData} key={index} earning = {earning} deleteData = {deleteData} >

            </IncomeTile>
                
            ))}


        { loading ? 
            <MySpinner></MySpinner> 
                : 
                    (spendings.length ?
                        null
                        :
                        <h5>No Expense Data !</h5>
                        )  
          }
        

    </Cover>

    </>
  )
}

export default Expense


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
    cursor: pointer;

`