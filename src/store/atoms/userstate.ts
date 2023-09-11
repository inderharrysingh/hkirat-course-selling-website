import { atom } from "recoil";


export const userState = atom<null | String >({
    key : "username",
    default : null 
})