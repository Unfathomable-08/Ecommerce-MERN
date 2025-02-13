import React, { useEffect, useState } from 'react'
import '../Styles/Login.css'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const submitFn = (data) => {
    setFormData(data);
  }

  useEffect(()=>{
    if (formData !== ''){
        localStorage.setItem('email', formData.email)
    }

    const fetchData = async () => {
      if (formData !== "") {
        try {
          const res = await axios.post('https://zyvelo.vercel.app/api/login', formData);
          if (res.status === 200){
            localStorage.setItem("token", res.token);
            return navigate('/');
          }
        } catch (error) {
          alert('An error occured while sending data!')
          console.error(error);
        }
      }
    };
    fetchData();
  },[formData])

  return (
    <div className='login-page'>
      <div className="login-container">
        <form onSubmit={handleSubmit(submitFn)}>
          <h2>Login Form</h2>
          <div className="toggler">
            <div className="active"><Link className="active-link" to='/login'>Login</Link></div>
            <div><Link className="link" to='/signup'>Signup</Link></div>
          </div>

            <input
              type="email"
              placeholder='Email Address'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
            <input
              type="text"
              placeholder='Password'
              {...register('password', { 
                required: 'Password is required', 
                minLength: {
                  value: 4, 
                  message: 'Password must be at least 4 characters long'
                },
                maxLength: {
                  value: 30, 
                  message: 'Password must be less than 30 characters'
                }
              })}
            />
            {errors.password && <p className='error'>{errors.password.message}</p>}
            <Link to="/login" className='forgetPs'>
              Forget Password?
            </Link>
            <input type="submit" value='Login' disabled={isSubmitting}/>
        </form>
      </div>
    </div>
  )
}

export default Login
