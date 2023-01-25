import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import TransactionTile from './TransactionTile'
import BudgetTile from './BudgetTile'
import ActivityBar from './ActivityBar'
import AuthContext from '../context/AuthContext'

const HomePage = () => {

  let [userData,setUserData] = useState([]);

  let {getUserDetails} = useContext(AuthContext);

  const getData = async ()=>{
    let resp = await getUserDetails();
    let data = await resp;
    setUserData(data)
  }
  
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date();


  useEffect(()=>{

    getData()

  },[])

  return (
    <Container>
        <WelcomeBlock>
            <Image>
            {userData.img ? 
                        <img src= {`${userData?.img}`} /> 
                                  :
                        <img src= 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' /> 
            }
                

            </Image>
            <div>
                <h5 className='blue'>Welcome back, {userData?.name} </h5>
                <Para className='orange'>This is your dashboard. Overview of everything !</Para>
            </div>
        </WelcomeBlock>

        <h5 style={{'margin-left':'3.5vw','margin-bottom':'1.5vw'}} className='blue'> For {month[d.getMonth()]}  </h5> 

        <Column1>
            <Transaction>
                <h5 className='blue'>Transaction</h5>
                <hr></hr>

                <TransactionTile/>

            </Transaction>

            <Budget>
                <h5 className='blue'>Budget Status</h5>
                <hr></hr>

                <BudgetTile/>

            </Budget>

        </Column1>

        <h5 style={{'margin':'2.2vw 0vw 1.5vw 3.5vw',}} className='blue'> For Past Few Months ... </h5>

        <Column2>

            <ActivityBar />
        
        </Column2>

        

        


    </Container>
  )
}

const Container = styled.div`

`


const WelcomeBlock = styled.div`
    padding-top : 1rem;
    padding-bottom : 2rem;
    display : flex;
    align-items : center;
    gap : 1rem;

    @media (max-width: 768px) {
        width:100%;
        justify-content : space-evenly;
      }
    
`

const Image = styled.div`
    overflow :hidden;
    width : 5.5rem;
    height : 5.5rem;
    border-radius : 50%;
    margin-left:1em;
`

const Para = styled.p`
@media (max-width: 768px) {
    max-width: 60vw
  }
`

const Transaction = styled.div`
    padding : .6rem;
    width: 40vw;
    border-radius : 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media (max-width: 768px) {
        width:90vw;
        
      }
    
`

const Budget = styled.div`
    padding : .6rem;
    width: 45vw;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius : 20px;   

    @media (max-width: 768px) {
        width : 90vw;
      }

`

const Column1 = styled.div`

    display : flex;
    justify-content : space-around;
    @media (max-width: 768px) {
        width:100%;
        flex-direction : column;
        align-items : center;
        gap : 1em;
      }

`
const Column2 = styled.div`
     
    margin-top : 2rem;
    margin-bottom : 2rem;
    display : flex;
    align-items : center;
    justify-content : center;  

`



export default HomePage