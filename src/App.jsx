import './index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Checkout from './Pages/Checkout'
import { ToastContainer } from 'react-toastify'
import ConfirmOrder from './Pages/ConfirmOrder'

const App = () => {
  return (
    <div>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/details' element={<Checkout/>}/>
          <Route path='/checkout' element={<ConfirmOrder/>}/>
        </Routes>
    </div>
  )
}

export default App
