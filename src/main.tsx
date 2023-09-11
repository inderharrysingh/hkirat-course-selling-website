import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter , Route, Routes} from 'react-router-dom'
import { Navbar } from './components/Navbar.tsx'
import { LoginPage  } from './components/Login.tsx'
import { Signup } from './components/Signup.tsx'
import { Courses } from './components/Courses.tsx'
import { CourseDetails } from './components/CourseDetails.tsx'
import { RecoilRoot } from 'recoil';
import { InitUser } from './App.tsx'
import { CreateCourse } from './components/CreateCourse.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
        <BrowserRouter>
         <InitUser />
          <Navbar />
          <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/courses' element={<Courses />}></Route>
        <Route path='/create' element={<CreateCourse />}></Route>
        <Route path='/courses/:id' element={<CourseDetails  />}></Route>
          </Routes>
          
        </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
