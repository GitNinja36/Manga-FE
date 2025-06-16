import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import AllBooks from './pages/AllBooks'
import Manga from './pages/Manga'
import Sell from './pages/Sell'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Footer from './components/Footer/Footer'
import Profile from './pages/Profile'
import Randome from './pages/Randome'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/manga/:id' element={<Manga />} />
        <Route path='/manga/randome/:id' element={<Randome />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App