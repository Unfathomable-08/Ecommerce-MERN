import React, { useState, useEffect } from 'react';
import '../Styles/Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState('');
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const submitFn = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (formData !== "") {
        if (formData.password == formData.rePassword){
          try {
            const res = await axios.post('https://zyvelo.vercel.app/api/signup', formData);
            console.log(res)
            if (res.status === 201){
              localStorage.setItem("token", res.token);
              return navigate('/login');
            }
          } catch (error) {
            alert('An error occured while sending data!')
            console.log(error);
          }
        }
        else {
          setError('rePassword', {
              type: "manual", 
              message: "Confirm passowrd is not same as password entered"
            }
          )
        }
      }
    };
    fetchData();
  }, [formData]);

  return (
    <div className='login-page'>
      <div className="login-container">
        <form onSubmit={handleSubmit(submitFn)}>
          <h2>Signup Form</h2>
          <div className="toggler">
            <div className=""><Link className="link" to='/login'>Login</Link></div>
            <div className="active"><Link className="active-link" to='/signup'>Signup</Link></div>
          </div>
          
          <div className="name-input">
            <input
              type="text"
              placeholder='First Name'
              {...register('first_name', {
                required: 'Name is required'
              })}
              />
            <input
              type="text"
              placeholder='Last Name'
              {...register('last_name', {
                required: 'Name is required'
              })}
              />
              {errors.fname && <p className='error'>{errors.fname.message}</p>}
              {errors.lname && <p className='error'>{errors.lname.message}</p>}
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

          <input
            type="text"
            placeholder='Confirm Password'
            {...register('rePassword', { 
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
          {errors.rePassword && <p className='error'>{errors.rePassword.message}</p>}
          
          <input
            type="text"
            placeholder='Country'
            {...register('country', { 
              required: 'Country name is required', 
            })}
          />
          {errors.country && <p className='error'>{errors.country.message}</p>}

          <input type="submit" value='Signup' disabled={isSubmitting} />
        </form>
      </div>
    </div>
  );
}

export default Signup;