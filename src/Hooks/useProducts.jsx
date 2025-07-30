import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const fetchProducts = async() =>{
    const response = await axios.get(`${API_BASE_URL}/api/Product`);
    return  response.data;
};
const createProduct = async (newProduct) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_BASE_URL}/api/Product`, newProduct,{
    headers : 
   { 'Authorization' : `Bearer ${token}`}
});

  return response.data;
};
const useProducts = () => {
    const {data:products,refetch} = useQuery({
        queryKey: ["products"],
        queryFn:fetchProducts,
        refetchOnWindowFocus:false,
        retry:2
    });

     const { mutateAsync: addProduct } = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
          console.log('Product created successfully');
          refetch();
          toast.success('Product created successfully!');
        },
        onError: (error) => {
          console.error('Error creating Product:', error);
          toast.error('Error creating Product');
        },
      });
    return {
        products,
        refetch,
        addProduct
    }
};
export default  useProducts;