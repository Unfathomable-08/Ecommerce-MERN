import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";


const Products = () => {
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
                console.log(res)
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts();
    }, [])
  return (
    <>
      <Navbar/>
      <div className="container" style={{marginTop: '120px'}}>
        <div className="products">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {data.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>    
      </div>
    </>
  )
}

export default Products
