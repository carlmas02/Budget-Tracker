import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {

    const {access,logoutUser} = useContext(AuthContext);

  return (
    <Container> 
        <Text>
            Budget Tracker
        </Text>

        {access?

            <><Option>
                  <Link to={`/`} style={{ textDecoration: 'none' }}><h5>OverView</h5></Link>
                  <Link to={`/expenses`} style={{ textDecoration: 'none' }}><h5>Expenses</h5></Link>
                  <Link to={`/income`} style={{ textDecoration: 'none' }}> <h5>Income</h5></Link>
                  <Link to={`/settings`} style={{ textDecoration: 'none' }}> <h5>Settings</h5></Link>


              </Option><Button>

                      <Link onClick={logoutUser} to={'/login'} style={{ textDecoration: 'none' }}> <h6>Logout</h6> </Link>

                  </Button></>

        :  

            null
    
    
        }



        
    </Container>
  )
}

const Container = styled.div`
    display : flex;
    justify-content : space-around;
    align-items : center;
    margin : auto 4rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
      }

`
const Text = styled.h1`

    display : flex;


`

const Option = styled.div`

    display : flex;
    // background : red;
    gap : 2rem;

    @media (max-width: 768px) {
        flex-wrap : wrap;
        justify-content:space-evenly ;
        // gap : 6em;
      }

`

const Button = styled.a`

    // background: var(--blue);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
    padding : 0.5rem 1rem;
    text-decoration : none;
	color : var(--orange);
`



export default Header