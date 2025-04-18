import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <RegisterForm /> } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={ <Home />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
