import React, { useContext,useEffect, useState } from 'react'
import styled from 'styled-components'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import AuthContext from '../context/AuthContext';

const TransactionTile = () => {
  
  let {tokens} = useContext(AuthContext);

  let [data,setData] = useState([]);

  const getTranscations = async () =>{
    let response = await fetch('/transactions/',{

      method : "GET",
      headers :{'Content-Type':'application/json',
                'Authorization' : `Bearer ${tokens.access}`},
     
  })

    let data = await response.json();
    setData(data);
  }

  useEffect(()=>{

    getTranscations();

  },[])

  const data01 = [
    { name: 'Income', value: data.earnings },
    { name: 'Savings', value: data.savings },
    { name: 'Expenses', value: data.spendings },
  ];

  const COLORS = [ '#454f80', '#2f3149' ,'#f3633f' ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Container>

      <div style={
        {
          padding: 10
        } 
      }>

        <Box>
          <Circle color = '#f3633f' >
          </Circle>

          <Cost>
            <h6>Rs. {data.spendings}</h6>
            <h6 >Expense</h6>
          </Cost>

        </Box>

        <Box>
          <Circle color='#2f3149' >
          </Circle>

          <Cost>
            <h6>Rs. {data.earnings}</h6>
            <h6>Income</h6>
          </Cost>

        </Box>

        <Box>
          <Circle color='#454f80'>
          </Circle>

          <Cost>
            <h6>Rs. {data.savings}</h6>
            <h6 >Savings</h6>
          </Cost>

        </Box>

      </div>

            
      <Holder>
          <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data01}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </Holder>

    </Container>

  )
}

const Container = styled.div`
    
    
    display : grid;
    grid-template-columns: 1.2fr 2.8fr  ;
    gap : 1rem;
`

const Box = styled.div`
    display : flex;
    align-items : center;
    gap : 1rem;
    padding : 1rem;

`

const Circle = styled.div`
      width : 18px;
      height : 18px;
      background : ${({color})=>color};
      border-radius : 50%;

`

const Cost = styled.div`
    

`
const Domain = styled.div`
    

`

const Bar  = styled.div`
    

`

const Holder = styled.div`

  width : 90%;
  

  @media (max-width: 760px) {
    width : 93%;
  }

`

// ResponsiveContainer = styled.div`
//   @media (max-width: 768px) {
//     width : 50%;
//     height : 50%;
//   }

// `
export default TransactionTile





