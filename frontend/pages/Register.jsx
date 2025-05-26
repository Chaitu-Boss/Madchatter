import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (password.length < 7) {
      newErrors.password = "Password must be at least 7 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        axios.post('http://localhost:5000/signup', { username, email, password }, { withCredentials: true })
          .then((response) => {
            if (response.status === 201) {
              localStorage.setItem('email', email);
              toast.success("Registered successfully!");
              navigate('/login');
            } else {
              toast.error(response.data.message || "Registration failed. Please try again.");
            }
          })

      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
        return; 
      }
      console.log("Registering:", { username, email, password });
    } else {
      toast.error("Please fix the highlighted errors.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center">
      <motion.div
        className="max-w-md mx-auto p-8 rounded-xl bg-gray-900 shadow-lg w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>
        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={`w-full bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 ${
                errors.username ? "ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 ${
                errors.email ? "ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full bg-gray-800 p-3 rounded focus:outline-none pr-10 focus:ring-2 ${
                errors.password ? "ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            <span onClick={() => setShowPass(!showPass)} className="absolute top-3 right-3 cursor-pointer text-gray-400">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-black font-semibold py-3 rounded hover:bg-blue-600 mx-auto block transition duration-200 hover:scale-105 cursor-pointer"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
