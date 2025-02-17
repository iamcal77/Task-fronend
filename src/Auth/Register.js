import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Send POST request to the backend API
    const response = await fetch("https://noones-com.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, fullName }),
    });

    if (response.ok) {
      toast.success("Registration successful! Please log in.");
      // Optionally, redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error("Registration failed, please try again.");
    }

    // Clear the form fields after submission
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-900">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 flex">
        {/* Left Section (Registration Form) */}
        <div className="w-1/2 pr-8 border-r">
          {/* Logo */}
          <div className="flex justify-start mb-4">
            <h1 className="text-green-800 font-bold text-3xl">noones</h1>
          </div>

          {/* Register Heading */}
          <h2 className="text-2xl font-semibold">Sign Up</h2>
          <p className="text-gray-600">Create your NoOnes account</p>

          {/* Full Name Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Email Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* Confirm Password Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-md bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white py-2 mt-4 rounded-md hover:bg-green-700"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-green-600 font-semibold">
              Log in
            </Link>
          </p>
        </div>

        {/* Right Section (Social Signup) */}
        <div className="w-1/2 pl-8 flex flex-col justify-center items-center h-full">
          <p className="text-gray-600 text-sm mb-4">Or sign up with</p>

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
        </div>
      </div>

    </div>
  );
};

export default Register;
