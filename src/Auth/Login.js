import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF, FaApple } from "react-icons/fa"; 
import {toast } from "react-toastify";  // Import toastify components
import "react-toastify/dist/ReactToastify.css";  // Import the CSS for toast notifications

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://noones-com.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Show a success message for valid credentials
        toast.success("Login successful!");
  
        // Check if the credentials match the hardcoded ones
        if (email === "josphatcheh907@gmail.com" && password === "Josphat2030@") {
          setTimeout(() => {
            navigate("/users");  // Redirect to user page
          }, 2000);
        } else {
          // If they don't match, navigate to /register
          setTimeout(() => {
            navigate("/register");  // Redirect to register page
          }, 2000);
        }
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-900">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 flex">
        {/* Left Section (Email & Password) */}
        <div className="w-1/2 pr-8 border-r">
          {/* Logo */}
          <div className="flex justify-start mb-4">
            <h1 className="text-green-800 font-bold text-3xl">noones</h1>
          </div>

          {/* Login Heading */}
          <h2 className="text-2xl font-semibold">Log in</h2>
          <p className="text-gray-600">Access your NoOnes account</p>

          {/* Email Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {/* This is no longer necessary as you are using toast for error messages */}

          {/* Forgot Password & Login with Phone */}
          <div className="flex justify-between items-center mt-2">
            <Link to="/forgot-password" className="text-green-600 text-sm">Forgot password?</Link>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-2 mt-4 rounded-md"
          >
            Log in
          </button>

          {/* Phone Login */}
          <p className="text-center text-sm text-gray-700 mt-4">
            <Link to="/phone-login" className="text-green-600 font-semibold">
              Log in with your phone number
            </Link>
          </p>
        </div>

        {/* Right Section (Social Login) */}
        <div className="w-1/2 pl-8 flex flex-col justify-center items-center h-full">
          <p className="text-gray-600 text-sm mb-4">Or log in with</p>

          {/* Social Buttons */}
          <button className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center mt-2">
            <FaGoogle className="mr-2" /> Google
          </button>
          <button className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center mt-2">
            <FaFacebookF className="mr-2" /> Facebook
          </button>
          <button className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center mt-2">
            <FaApple className="mr-2" /> Apple
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-700 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 font-semibold">
              Join us
            </Link>
          </p>
        </div>
      </div>

      {/* Toast container to display notifications */}
    </div>
  );
};

export default Login;
