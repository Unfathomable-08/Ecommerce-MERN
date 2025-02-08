import { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Products from '../Components/Products'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import Checkout from './Checkout'

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/products')
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts();
    }, []);

  return (
    <div>
      <Navbar/>
      <Banner products={data}/>
      <Products products={data}/>
    </div>
  )
}

export default Home