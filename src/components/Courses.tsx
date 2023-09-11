
import { Typography , Box } from '@mui/material' 
import { Course } from './Course'
import { useEffect } from 'react'
import {  useRecoilState } from 'recoil'
import { CourseI, courseArray } from '../store/atoms/courseArray'
import { Link } from 'react-router-dom'

export function Courses(){

    const [ cArray  , setCourses] = useRecoilState(courseArray);

    useEffect(() => {
        fetch('http://localhost:3000/admin/courses', {
            method: 'GET',
            headers : {
                 'Content-Type': 'application/json'
            },
        })
        .then(data => data.json())
        .then(data => {
            setCourses(data)
        })
        .catch(error => console.log(error))
    }, [])

    return (
         <Box sx={{
            margin: '2em',
            display: 'flex',
            flexDirection:"column",
            alignItems: "center",
            gap: "2em"
         }}>
            <Typography variant="h4" >Courses </Typography>

            <Box sx={{
                display : "flex",
                gap: "1em",
                width: "80%",
                alignItems: "center",
                justifyContent: "center",
                padding: '1em'
            }}>

            {
                cArray.map((course : CourseI) => <Link to={`/courses/${course._id}`} ><Course width={345} height={400} display='flex' id={course._id} /> </Link> )
            }
            
              
                
            </Box>

        </Box>

       )
}
