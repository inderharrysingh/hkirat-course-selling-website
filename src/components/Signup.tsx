import { Card , Container, TextField, Button } from "@mui/material";
import { useState } from 'react'
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userstate";
import { useNavigate } from "react-router-dom";


export function Signup(){
    const navigate = useNavigate();

    const [name , setname] = useState<String>('');
    const [ passwd , setpasswd] = useState<String>("");
    const setUsername = useSetRecoilState(userState)

    function handleSubmit(){
        fetch('http://localhost:3000/admin/signup', {
            method : "POST",
            headers : {
                 'Content-Type': 'application/json'
            },
            body : JSON.stringify({ username : name , password : passwd  })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data.token)
            localStorage.setItem("token", data.token);
            setUsername(name);
            setname("")
            setpasswd("");
            navigate('/');
            
        })
        .catch(error => console.log(error))

    }


    return ( 

       <Container maxWidth='lg' style={{
        marginTop: "10%"
       }}>
           <Card variant="outlined"
           style={{
            display: 'flex',
            flexDirection: "column",
            gap: '1em',
            padding: '3em'
           }}>
            <TextField id="outlined-basic" label="Name" value={name}  variant="outlined" onChange={(e) => setname(e.target.value)} />
            <TextField type="password" id="outlined-basic" value={passwd} label="Password" variant="outlined" onChange={(e) => setpasswd(e.target.value)} />        
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
           </Card>
       </Container> 
    ) 
     
    }