import './index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Checkout from './Pages/Checkout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
    </div>
  )
}

export default App
