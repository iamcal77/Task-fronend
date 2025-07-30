import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'devextreme/dist/css/dx.material.blue.light.css';
import ProductList from "./Pages/ProductList";
import Login from "./Auth/Login";
import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Orders from "./Pages/Orders";
import CooperativesPage from "./Pages/CooperativesPage";
import Extensions from "./Pages/Extensions";

const queryClient = new QueryClient();

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
         <Route path="/" element={<DashboardLayout />}>

        <Route path="/products" element={<ProductList token = {localStorage.getItem ('token')} />} />
        <Route path="/orders" element={<Orders token = {localStorage.getItem ('token')} />} />
        <Route path="/cooperatives" element={<CooperativesPage token = {localStorage.getItem ('token')} />} />
        <Route path="/extensions" element={<Extensions token = {localStorage.getItem ('token')} />} />



        </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </QueryClientProvider>
  );
};

export default App;
