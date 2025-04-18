import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ChangePasswordForm from './components/ChangePasswordForm'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <RegisterForm /> } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/update-password" element={ <ChangePasswordForm />} />
        <Route path="/" element={ <Home />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductForm />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
