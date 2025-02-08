import { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Products from '../Components/Products'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import Checkout from './Checkout'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'

const Home = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const email = localStorage.getItem('email');
    if (!email){
      navigate('/login')
    }
  },[]);

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
      <Footer/>
    </div>
  )
}

export default Home