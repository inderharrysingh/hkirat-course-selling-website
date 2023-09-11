import { atom } from "recoil";

export interface CourseI {
    title: String ,
    description: String,
    price: Number,
    imageLink: String ,
    _id : String  
}

export const courseArray = atom< CourseI[] >({
    key : "courseArray",
    default : []
})
