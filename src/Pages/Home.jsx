import { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import Products from '../Components/Products'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'

const Home = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const fetchFn = async () => {
      try {
        const res = await axios.get('https://zyvelo.vercel.app/api/auth', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status == 200){
          navigate('/');
        }
        else if (res.status == 401){
          navigate('/login')
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchFn
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