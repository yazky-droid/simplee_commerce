import { useContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ChangePasswordForm from './components/ChangePasswordForm'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import ProductDetail from './components/ProductDetail'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import AuthContext from './contexts/AuthContext'

function App() {
  const { isLoading, isLoggedIn, role, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <RegisterForm /> } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/update-password" element={ <ChangePasswordForm />} />
        <Route path="/" element={ <Home />} />

        <Route path="/products" element={role === 'admin' ? <ProductList /> : <div>Access Denied</div>} />
        <Route path="/products/create" element={role === 'admin' ? <ProductForm /> : <div>Access Denied</div>} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={role === 'admin' ? <ProductForm /> : <div>Access Denied</div>} />
        <Route path="/users" element={role === 'admin' ? <UserList /> : <div>Access Denied</div>} />
        <Route path="/users/create" element={role === 'admin' ? <UserForm /> : <div>Access Denied</div>} />
        <Route path="/users/:id/edit" element={role === 'admin' ? <UserForm /> : <div>Access Denied</div>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
