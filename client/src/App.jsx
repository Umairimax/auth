import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route , Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import {Toaster} from 'react-hot-toast';

function App() {

  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/auth" element={<Login/>}/>
      <Route path='/auth/users/:name' element={<Welcome/>} />
    </Routes>
    </>
  )
}

export default App
