import { Box,Paper  , Grid  ,Typography ,Divider ,  List, ListItem, ListItemText,  } from "@mui/material";
import { Course } from "./Course";
import { CourseI, courseArray } from "../store/atoms/courseArray";
import { useRecoilState, useRecoilValue  } from 'recoil'
import { useLocation } from "react-router-dom";
import { Card , TextField, Button } from "@mui/material";
import { useState } from "react";



export function CourseDetails(){
    const location = useLocation();
    const [ ChangeDetails, setChangeDetails ]  = useState(false);
    const id = location.pathname.split('/')[2];
   return (
    <div style={{
        display : "flex",
        minHeight: "100%",
        flexDirection: "column",
        marginBottom: "5em"
    }}  >
             <BlackTop />
                <Grid container spacing={2}>
                <Grid item xs={8} style={{ marginTop: '10%',display: 'flex', justifyContent: 'center'}}>
                       {ChangeDetails ? <Change id={id} /> :  <CourseData id={id} /> } 
                </Grid>
                <Grid item xs={4} 
                style={{  marginTop: '-3em' }}>
                        <Course id={id} width={300} height={280} display="none" />       
                </Grid>
                </Grid>
             
             <Button  onClick={() => setChangeDetails(prev => !prev )}>{ ChangeDetails ?  "Close" : "Update Course" }</Button>
    </div>
   )
}


function CourseData({id } : {id : string }){
    const course =  useRecoilValue(courseArray).find( course => course._id == id );
    console.log(course);
    return ( 
        
        <Paper elevation={2}
            sx={{ 
                width: '60%', bgcolor: 'background.paper',
        
             }}
        >
            <List 
            sx={{
                padding: "0",
                width : '100%'
            }}
            >
                 <ListItem>
        <ListItemText primary={`Name : ${course?.title}`}  />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={`Description : ${course?.description}`}  />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={`Price : Rs.${course?.price}`}   />
      </ListItem>
      < Divider />
            </List>
        </Paper>

    )
}


function Change({ id } : {id : string }){

    const [courses, setCourse] =  useRecoilState(courseArray);
    const coursesCopy = [...courses];
    let courseIndex  : number  ; 
    const course = courses.find( (c , index ) =>{
            if (c._id == id ){
                courseIndex : index ;
                return c;
            }} ) as CourseI;

    const [title , settitle] = useState<String>(course.title);
    const [dsption , setDsption] = useState<String>(course.description);
    const [price , setPrice] = useState<Number>(course.price);
    const [url , setUrl] = useState<String>(course.imageLink);

    function handleSubmit(){
        const updatedCourse : CourseI = { title : title , description : dsption , price : price , imageLink : url  , _id : id };
        const token = localStorage.getItem('token') as string ;
        fetch('http://localhost:3000/admin/courses/'+ id , {
            method : "PUT",
            headers : {
                 'Content-Type': 'application/json',
                 'Authorization': token
            },
            body : JSON.stringify(updatedCourse)
        })
        .then(response =>  response.json())
        .then(data => {
                 console.log(data);
                 setCourse(data);

                
        })
        .catch(error => console.log(error))

    }

    return (
        <Card variant="outlined"
        style={{
        width : "50%",
         display: 'flex',
         flexDirection: "column",
         gap: '1em',
         padding: '3em'
        }}>
         <TextField id="title" label="Title" value={title}  variant="outlined" onChange={(e) => settitle(e.target.value)} />
         <TextField  id="description" value={dsption} label="Description" variant="outlined" onChange={(e) => setDsption(e.target.value)} />        
         <TextField  id="Price" value={price} label="Price" variant="outlined" onChange={(e) => setPrice(parseInt(e.target.value))} />        
         <TextField  id="url" value={url} label='Image URL ' variant="outlined" onChange={(e) => setUrl((e.target.value))} />        
         <Button variant="contained" onClick={handleSubmit}>Update</Button>
        </Card>
    )
}





function BlackTop(){
    return (
        <Box sx={{
            height: "25vh",
            width: "100%",
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        }} >
            <Typography variant="h4" color={'white'}>course</Typography>
        </Box>

    )
}


