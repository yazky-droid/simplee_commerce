import { useContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import Home from './pages/Home'
import ChangePasswordForm from './components/ChangePasswordForm'
import ProductList from './pages/ProductList'
import ProductForm from './components/ProductForm'
import ProductDetail from './components/ProductDetail'
import UserList from './pages/UserList'
import UserForm from './components/UserForm'
import AuthContext from './contexts/AuthContext'
import ProductExplore from './pages/ProductExplore'
import Layout from './components/Layout'
import UserProfile from './pages/UserProfile'
import AdminDashboard from './components/AdminDashboard'
import EditProfile from './components/EditProfile'
import WishlistPage from './pages/WishlistPage'




function App() {
  const { isLoading, isLoggedIn, role, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <Layout><RegisterForm /></Layout> } />
        <Route path="/login" element={<Layout><LoginForm /></Layout>} />
        <Route path="/update-password" element={ <Layout><ChangePasswordForm /></Layout>} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><ProductExplore /></Layout>} />
        <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/profile" element={<Layout>{role === 'user' ? <UserProfile /> : <div>Access Denied</div>}</Layout>} />
        <Route path="/wishlist" element={<Layout>{role === 'user' ? <WishlistPage /> : <div>Access Denied</div>}</Layout>} />
        <Route path="/profile/:id/edit" element={<Layout>{role === 'user' ? <EditProfile /> : <div>Access Denied</div>}</Layout>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Layout>{role === 'admin' ? <AdminDashboard /> : <div>Access Denied</div>}</Layout>} />
        <Route path="/admin/users" element={<Layout>{role === 'admin' ? <UserList /> : <div>Access Denied</div>}</Layout>} />
        <Route path="/admin/users/create" element={<Layout>{role === 'admin' ? <UserForm /> : <div>Access Denied</div>}</Layout>} />
        <Route path="/admin/users/:id/edit" element={<Layout>{role === 'admin' ? <UserForm /> : <div>Access Denied</div>}</Layout>} />
        <Route path="/admin/products/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/admin/products" element={<Layout>{role === 'admin' ? <ProductList /> : <div>Access Denied</div>}</Layout>} />
        <Route path="/admin/products/create" element={<Layout>{role === 'admin' ? <ProductForm /> : <div>Access Denied</div>}</Layout>} />
        <Route path="/admin/products/:id/edit" element={<Layout>{role === 'admin' ? <ProductForm /> : <div>Access Denied</div>}</Layout>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
