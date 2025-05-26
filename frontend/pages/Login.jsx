import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (password.length < 7) {
      newErrors.password = "Password must be at least 7 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true }).then((response) => {
          if (response.status === 200) {
            localStorage.setItem('email', email);
            toast.success("Logged in successfully!");
            navigate('/dashboard');
          } else {
            toast.error(response.data.message || "Login failed. Please try again.");
          }
        })
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
        return;
        
      }
      console.log("Logging in:", { email, password });
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
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 ${errors.email ? "ring-red-400" : "focus:ring-green-400"
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
              className={`w-full bg-gray-800 p-3 rounded focus:outline-none pr-10 focus:ring-2 ${errors.password ? "ring-red-400" : "focus:ring-green-400"
                }`}
            />
            <span onClick={() => setShowPass(!showPass)} className="absolute top-3 right-3 cursor-pointer text-gray-400">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-1/2 bg-green-500 text-black font-semibold py-3 rounded hover:bg-green-600 mx-auto block transition duration-200 hover:scale-105 cursor-pointer"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-400 mt-4">
            New to Media Pulse?{" "}
            <span
              onClick={() => navigate('/register')}
              className="text-green-400 hover:underline cursor-pointer"
            >
              Register here
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
