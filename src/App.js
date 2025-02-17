import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Register from "./Auth/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Auth/Login";
import UsersPage from "./Auth/UsersPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Redirect to ProductPage if token exists, otherwise show Login */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UsersPage />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </QueryClientProvider>
  );
};

export default App;
