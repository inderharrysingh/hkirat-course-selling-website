import { Link } from 'react-router-dom'
import './App.css'
import {  useRecoilValue, useSetRecoilState } from 'recoil'
import { Typography , Button, Box } from '@mui/material'
import { useEffect } from 'react'
import { userState } from './store/atoms/userstate'

function App() {
    
     const userName  = useRecoilValue(userState);
    
return (

    <Box>
        <Typography variant='h1'>Main Page</Typography>
        {
        userName ?
         <><Typography variant='h1'>Welcome {userName}</Typography></> 
         :
          <>
                <Button component={Link} to="/signup">Signup</Button>
                <Button component={Link} to="/login" >Login</Button>
          </>
          }
    </Box>

)
 
}


export function InitUser(){
    const setUsername  = useSetRecoilState(userState);
    
    useEffect(() => {
       try{
           const token = localStorage.getItem('token') as string ;
           fetch("http://localhost:3000/users/me", {
   
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': token
               }
           })
           .then( data => data.json())
           .then( user => { 
                if ( user.username ){
                   setUsername(user.username);
                }
               }  )
       }

       catch(err){
           console.log(err);
       }
       

   }, [])

   return <></>
} 

export default App
