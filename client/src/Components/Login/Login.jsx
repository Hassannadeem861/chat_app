import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/authSlice';

const Signup = () => {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(`http://localhost:3000/api/v1/auth/login`, form,
        {
        
          withCredentials: true

        }
      );


      if (response.status === 200) {
        toast.success(response.data.message)
        navigate("/home")
        dispatch(setAuthUser(response.data))
        // setForm({
        //   email: '',
        //   password: '',
        // })
      }
    } catch (error) {
      toast.error(error.response.data.message)

    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Signup