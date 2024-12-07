import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './components/Homepage'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Cart from './components/Cart'
import ProductPage from './components/ProductPage '
import ShopPage from './components/ShopPage'
import { Routes,Route } from 'react-router-dom'
import CreateAccount from './components/createaccount'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>

      <Route path='/' element={<HomePage/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/product/:id' element={<ProductPage/>} />
      <Route path='/shop' element={<ShopPage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/create' element={<CreateAccount/>}/>

    </Routes>
    
    <Footer/>
    
  

    </>
  )
}

export default App
