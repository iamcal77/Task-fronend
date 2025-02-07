import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter, Routes } from "react-router-dom";  // Use BrowserRouter instead of Router
import Register from "./Auth/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Auth/Login";
import { useEffect, useState } from "react";
import ProductPage from "./Pages/ProductPage";
import Navbar from "./Navbar";

const queryClient = new QueryClient();

const App = () => {
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>  {/* Change Router to BrowserRouter */}
      <Navbar />
        <Routes>
        {/* <Route
            path="/"
            element={token ? <Navigate to="/admin" replace /> : <Login setToken={setToken} />}
            
          /> */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProductPage />} />


        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </QueryClientProvider>
  );
};

export default App;
