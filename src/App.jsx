import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import AllBooks from './pages/AllBooks'
import Manga from './pages/Manga'
import Sell from './pages/Sell'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Randome from './pages/Randome'

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
    <Toaster position="bottom-right" />
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />

        <Route path='/all-books' element={
          <ProtectedRoute><AllBooks /></ProtectedRoute>
        } />
        <Route path='/manga/:id' element={
          <ProtectedRoute><Manga /></ProtectedRoute>
        } />
        <Route path='/random' element={
          <ProtectedRoute><Randome /></ProtectedRoute>
        } />
        <Route path='/sell' element={
          <ProtectedRoute><Sell /></ProtectedRoute>
        } />
        <Route path='/cart' element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App