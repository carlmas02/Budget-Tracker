import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AuthContext from '../context/AuthContext';
import Tile from './Tile'

const ActivityBar = () => {

  const [barData,setBarData] = useState([]);
  const [maxExpense,setMaxExpense] = useState([]);
  const [maxIncome,setMaxIncome] = useState([]);
  const {tokens} = useContext(AuthContext);

  const getBarData = async () =>{
    let response = await fetch('/test/',{

      method : "GET",
      headers :{'Content-Type':'application/json',
                'Authorization' : `Bearer ${tokens.access}`
               },
     
  })

    let data = await response.json();
    setBarData(data);
  }

  const getMaxTranscations = async () =>{
    let response = await fetch('/getMaxTransactions/',{

      method : "GET",
      headers :{'Content-Type':'application/json',
                'Authorization' : `Bearer ${tokens.access}`
               },
     
  })

    let data = await response.json();
    setMaxExpense(data['expenses']);
    setMaxIncome(data['earnings']);
  }

  


  useEffect(()=>{

    getBarData()
    getMaxTranscations()
    

  },[])


  return (
    <>
      <Container>
        <div>
            <Box>
              <h6 >Major Expenses</h6>

              <FlowBox >
                { (maxExpense.length != 0) ? 

                (maxExpense.map((ele,index)=>(

                    <Tile key={index} element = {ele} ></Tile>
                    
                )))         :

                  <h6>No Data</h6>
                
                }

              </FlowBox>

            </Box>
            
            <Box>
              <h6 >Major Income</h6>

              <FlowBox >
              { (maxIncome.length != 0) ? 

                (maxIncome.map((ele,index)=>(

                    <Tile key={index} element = {ele} ></Tile>
                    
                )))         :

                  <h6>No Data</h6>

                }
              </FlowBox>

            </Box>

         </div>

         <ChartHolder>

          <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={200}
                data={barData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expense" fill="#f3633f" />
                <Bar dataKey="earning" fill="#2f3149" />
              </BarChart>
            </ResponsiveContainer>


         </ChartHolder>


      </Container>
    </>
  )
}

export default ActivityBar


const Container = styled.div`

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius : 20px;
  width : 90vw;
  height : 50vh;
  display : flex;
  justify-content : space-evenly;
  align-items : center;

  @media (max-width: 1320px) {
    background :  ;
    flex-direction : column;
    height : 100vh;
  }

`

const Box = styled.div`

`


const FlowBox = styled.div`

    width : 30vw;
    height : 15vh;
    overflow : scroll;
    border-radius: 6px;
    box-shadow: 0 4px 28px rgba(123,151,158,.25);
    border: 1px solid #d6dee1;
    padding: 1rem;
    overflow-x: hidden;


    @media (max-width: 1320px) {
      // background : red;
      justify-content : space-evenly;
      width : 60vw;
    }

    @media (max-width: 670px) {
      width : 80vw;
      
    }


    /* custom scrollbar */
  ::-webkit-scrollbar {
    width: 22px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }


`

const ChartHolder = styled.div`

  width : 100vh;
  height : 45vh;


  @media (max-width: 768px) {
    width:100%;
    
  }

`