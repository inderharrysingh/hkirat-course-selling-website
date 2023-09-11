import { Card , Container, TextField, Button } from "@mui/material";
import { useState } from 'react'



export function CreateCourse(){
    

    const [title , settitle] = useState<String>('');
    const [dsption , setDsption] = useState<String>('');
    const [price , setPrice] = useState<Number>(500);
    const [url , setUrl] = useState<String>("");

    // set the token and set the usestate with the give usertitle 
    function handleSubmit(){
        const token = localStorage.getItem('token') as string ;
        fetch('http://localhost:3000/admin/create', {
            method : "POST",
            headers : {
                 'Content-Type': 'application/json',
                 'Authorization': token
            },
            body : JSON.stringify({ title : title , description : dsption , price : price , imageLink : url  })
        })
        .then(data => data.json())
        .then(data => {
            if ( data) {
                console.log(data);
                settitle("")
                setDsption("")
                setUrl("")
                setPrice(500);
            }
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
            <TextField id="title" label="Title" value={title}  variant="outlined" onChange={(e) => settitle(e.target.value)} />
            <TextField  id="description" value={dsption} label="Description" variant="outlined" onChange={(e) => setDsption(e.target.value)} />        
            <TextField  id="Price" value={price} label="Price" variant="outlined" onChange={(e) => setPrice(parseInt(e.target.value))} />        
            <TextField  id="url" value={url} label='Image URL ' variant="outlined" onChange={(e) => setUrl((e.target.value))} />        
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
           </Card>
       </Container> 
    ) 
     
    }