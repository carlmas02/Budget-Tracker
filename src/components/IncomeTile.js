import React, { useContext } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AuthContext from '../context/AuthContext';


const IncomeTile = ({earning,deleteData,setData,setStatus}) => {

    let {tokens} = useContext(AuthContext);
    let showData = (id,note,value) =>{
        document.getElementById('note').defaultValue =  note;
        document.getElementById('value').defaultValue = value;
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('box').style.opacity = 0.5;
        console.log(id)
    }


    const cancel = () => {
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('box').style.opacity = 1;
    }
    
   
  return (
    <>

    <Overlay id = 'overlay' >
        <input  id = 'note' /><br></br>
        <input id = 'value' />

        <div style={{'display':'flex'}} >
        <h6><Button onClick={()=>{setData(earning.id,
                                        document.getElementById('note').value,
                                        document.getElementById('value').value)
                                  cancel()
                                  setStatus(true)
                                }
                            } 
        
            style={{'color':'var(--blue)'}} >
            
              Update 
            
            </Button>
        </h6>
        <h6><Button onClick={cancel} style={{'color':'var(--blue)'}} >  Cancel </Button></h6>
        </div>

    </Overlay>

    
    <Box id = 'box'>
        <Details>
            <h5>{earning?.note}</h5>

            {earning?.income ?<h6>Rs. {earning?.income}</h6>:<h6>Rs. {earning?.expense}</h6>  }
            {/* <h6>{earning?.income}</h6> */}
        </Details>

        <Date>
        <h6>{earning?.date}</h6>

        </Date>

        <Icons>
        { earning?.income ?
            <IMG onClick={()=>showData} >

                <img  src= 'https://img.icons8.com/ios-glyphs/344/edit--v1.png' ></img>

            </IMG> :
            
            <IMG onClick={()=>showData(earning.id,earning.note,earning.expense)} >

                <img  src= 'https://img.icons8.com/ios-glyphs/344/edit--v1.png' ></img>

            </IMG>


        }
        
        <IMG onClick={()=>deleteData(earning.id)} >

           <img src="https://img.icons8.com/ios-glyphs/344/filled-trash.png"  ></img>

        </IMG>

        </Icons>


    </Box>
    
    </>
  )
}

export default IncomeTile


const Box = styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width : 50vw;
    display : inline-flex;
    align-items : center;
    justify-content : space-between;
    padding : 1rem;
    border-radius : 1rem;

    @media (max-width: 768px) {
        width: 90vw
      }

`

// editData(earning.id,earning.note,earning.income)

const Overlay = styled.div`
    position : fixed;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding : 2vw;
    border-radius : 20px;
    width : 35vw;
    height : 20vh;
    z-index : 10;
    background-color : white;
    display : none;
    margin-top :30vh;

    &:active{
        opacity: #e6007e;
    }

    @media (max-width: 768px) {
        width : 80vw;
        padding : 4vw;
        margin-left :8%;
        margin-top :40%;
    }

`

const Details = styled.div``

const Date = styled.div``

const Icons = styled.div``


const IMG = styled.div`
    width : 25px;
    padding :rem;

    //   &:hover{
    //     display: inline-block;
    //     width : 30px;
    //   }

`
const Button = styled.a`

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
    padding : 0.5rem 1rem;
    text-decoration : none;
	color : var(--orange);
    cursor : pointer ;
`