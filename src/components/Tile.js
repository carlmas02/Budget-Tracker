import React from 'react'
import styled from 'styled-components';

const Tile = ({element}) => {
  return (
    <>
    <Box>
        <h6>{element.note}</h6>


        {element.expense ?
                <h6 style={{'margin-left':'2rem'}}>Rs. {element.expense}</h6>

                         :
                <h6 style={{'margin-left':'2rem'}}>Rs. {element.income}</h6>
      
        }

        
    
    </Box>

    </>
  )
}

export default Tile;

const Box = styled.div`
  margin-left : 1rem;
  margin-right : 1rem;
  display : flex;
  justify-content : space-between;

`