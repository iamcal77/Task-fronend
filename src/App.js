import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'devextreme/dist/css/dx.material.blue.light.css';
import ChatResponsesPage from "./Pages/ChatResponsesPage";
import ChatDetails from "./Pages/ChatDetails";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatResponsesPage />} />
          <Route path="/chat/:id" element={<ChatDetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </QueryClientProvider>
  );
};

export default App;
