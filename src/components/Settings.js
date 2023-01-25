import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import AuthContext from '../context/AuthContext';

const Settings = () => {

  let [userData,setUserData] = useState([]);
  let {tokens,logoutUser} = useContext(AuthContext);
  const [loading,setLoading] = useState(true);

  let navigateTo = useNavigate();

  let {getUserDetails} = useContext(AuthContext);

  const getData = async ()=>{
    let resp = await getUserDetails();
    let data = await resp;
    setUserData(data)
    setLoading(false)
  }

  let updateUser = async () =>{

    let formfield = new FormData();

    formfield.append('image',document.getElementById('photo').files[0])
    formfield.append('name', document.getElementById('name').value)
    formfield.append('mail', document.getElementById('mail').value)
    formfield.append('phone', document.getElementById('phone').value)

    console.log(formfield);

    let resp = await fetch(
          `http://127.0.0.1:8000/updateUser/`,{
          method :"PUT",
          headers :{
            //   'Content-type':'application/json',
              'Authorization' : `Bearer ${tokens.access}`
          },
        //   body : JSON.stringify({'name':  document.getElementById('name').value,
        //                          'mail':  document.getElementById('mail').value,
        //                          'phone':  document.getElementById('phone').value,
        //                          'image':  document.getElementById('photo').files[0],
        // })
        body : formfield
      
      })

      document.getElementById('accoverlay').style.display = 'none';
      document.getElementById('box').style.opacity = 1;
      window.location.reload();
  }

  const deleteAccount = async () =>{
    let response = await fetch('http://127.0.0.1:8000/deleteAccount/',{

        method : "GET",
        headers :{'Content-Type':'application/json',
                  'Authorization' : `Bearer ${tokens.access}`},
       
    })
    
    if(response.status===200){
        logoutUser();
        navigateTo('/login');

    }


  }

  const cancel = () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('accoverlay').style.display = 'none';
    document.getElementById('box').style.opacity = 1;  
  }

  const editAccount = () =>{

    document.getElementById('accoverlay').style.display = 'block';
    document.getElementById('box').style.opacity = 0.5;

  } 

  const deleteOverlay = () =>{

    document.getElementById('overlay').style.display = 'block';
    document.getElementById('box').style.opacity = 0.5;

  }


  useEffect(()=>{

    getData()


  },[])






  return (

    <>

        <Overlay id = 'overlay'>
            <h5> Are you Sure ? </h5>

            <div style={{'display':'flex'}} >
            <h6><Button onClick={()=>deleteAccount()}  style={{'color':'var(--blue)'}} >  Yes </Button></h6>
            <h6><Button onClick={cancel} style={{'color':'var(--blue)'}} >  No </Button></h6>
            </div>
        
        </Overlay>

        <AccountOverlay id = 'accoverlay'>

            <Image style={{'width':'7rem','height':'7rem'}} >
                {userData.img ? 
                        <img src= {`${userData?.img}`} /> 
                                  :
                        <img src= 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' /> 
                    }
            </Image>
            
            <form encType="multipart/form-data">
            <input id = 'photo' type= 'file' ></input>
            <input id = 'name' defaultValue={userData?.name} ></input> <br/>
            <input id = 'mail' defaultValue={userData?.mail} ></input> <br/>
            <input id = 'phone' defaultValue={userData?.phone} ></input> <br/>
            </form>
            <div style={{'display':'flex'}} >

                <h6><Button onClick={updateUser} style={{'color':'var(--blue)'}} >  Update </Button></h6>
                <h6><Button onClick={cancel} style={{'color':'var(--blue)'}} >  Cancel </Button></h6>
            </div>
            

        </AccountOverlay>
    
    <Box id = 'box'>

        

        <Row>

            
            <Cover>
                
                <Image>
                    {userData.img ? 
                        <img src= {`${userData?.img}`} /> 
                                  :
                        <img src= 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' /> 
                    }
                

                </Image>
                <Data>
                    <h5>{userData?.name}</h5>
                    <IMG  onClick={editAccount}  src='https://img.icons8.com/ios-glyphs/452/edit--v1.png'></IMG>
                    
                </Data>

                

                <Data>
                    <IMG src='https://cdn-icons-png.flaticon.com/512/3178/3178158.png' ></IMG>
                    <h6> {userData?.mail} </h6>
                </Data>

                <Data>
                    <IMG src='https://cdn-icons-png.flaticon.com/512/455/455705.png' ></IMG>
                    <h6> {userData?.phone} </h6>
                </Data>

            </Cover>

        </Row>

        <Row>
            <Cover>
                <h5>Change my Password</h5>

                <input placeholder=' Current Password' ></input>
                <input placeholder=' New Password' ></input>
                
                <Button> <h6> Change Password  </h6> </Button>

            </Cover>

            <Cover>
                <h5>Danger Zone</h5>

                <Button onClick={deleteOverlay} > <h6> Delete Account  </h6> </Button>
            </Cover>
            

        </Row>

        

    </Box>

    </>
  )
}

export default Settings


const Box = styled.div`
    
    display : flex;
    align-items : center;
    justify-content : space-evenly;
    height : 90vh;

    @media (max-width: 768px) {
        flex-direction : column;
        height : 115vh;
      }

`

const Image = styled.div`
        width : 16rem;
        border-radius : 50%;
        overflow : hidden;
        height : 16rem;

        @media (max-width: 768px) {
            width : 8rem;
            height :8rem;
          }


`

const Data = styled.div`

      display : flex;  
      gap : 1rem;


`
const IMG = styled.img`

    width : 30px;


`

const Row = styled.div``

const Cover = styled.div`

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding : 2vw;
    display : flex;
    flex-direction : column;
    align-items : center;
    gap : 1.5rem;
    width : 40vw;
    margin-bottom : 2.5rem;
    border-radius : 20px;

    @media (max-width: 768px) {
        width : 90vw;
        padding : 4vw;
      }


`

const Button = styled.a`

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
    padding : 0.5rem 1rem;
    text-decoration : none;
	color : var(--orange);
    cursor : pointer ;
`

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
    margin-left :35vw;
    margin-top :25vh;

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

const AccountOverlay = styled.div`
    margin-left :auto;
    position : fixed;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding : 2vw;
    border-radius : 20px;
    width : 35vw;
    height : 60vh;
    z-index : 10;
    background-color : white;
    display : none;
    margin-left :35vw;
    margin-top :15vh;

    &:active{
        opacity: #e6007e;
    }

    @media (max-width: 768px) {
        width : 80vw;
        padding : 4vw;
        margin-left :8%;
        margin-top :1%;
    }

`