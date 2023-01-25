import {React,useContext, useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useState } from 'react'
import Progress from './Progress'

const BudgetTile = () => {

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
        getTranscations()
    },[])


  return (
    <Content>

        <Box>
            <h6>Expenses</h6>
            
            
            <Progress></Progress>
            {/* <ProgressBar >
                <Progress progress= '70' >

                </Progress>

            </ProgressBar> */}
        </Box>

        <Box>
            <h6>Income</h6>

            
        </Box>


        <h6>View all Transactions</h6>

        <div style={{marginBottom: "1rem"}}>
            <Link to = '/expenses'>
                <Button>
                    <h6>Expenses</h6>
                </Button>
            </Link>

            <Link to = "/income">
                <Button style={{marginLeft :"3rem" }}>
                    <h6>Income</h6>
                </Button>
            </Link>
        </div>

    </Content>
  )
}

const Content = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-evenly;
    // align-items : center;
    gap : 2em;
    padding-left : 2rem;

    @media (max-width: 768px) {
        gap :1.6em;
      }
`

const Box = styled.div`

`



const Button = styled.button`

    border-radius: 5px;
    padding : 0.3rem .5rem;
    text-decoration : none;
    color : var(--blue);
    font-style : var(--ff) ;
`

// const ProgressBar = styled.div`

//     border : 2px solid black;
//     padding : 0.1rem;
//     border-radius : 20px;
//     width : 90%;

// `

// const Progress = styled.div`

//     background : #2f3149;
//     padding : 0.2rem;
//     border-radius : 20px; 
//     width : ${({progress}) => progress}%;


// `




export default BudgetTile