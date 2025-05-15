import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleSignup } from "../../Services/Api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignup(form, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            className="select select-bordered w-full"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="link text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
