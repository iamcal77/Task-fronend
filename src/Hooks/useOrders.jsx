import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchOrders= async() =>{
    const response = await axios.get(`${API_BASE_URL}/api/Orders`);
    return  response.data;
};

const postOrder = async (newOrder) => {
    const token = localStorage.getItem('token')
    const response = await axios.post (`${API_BASE_URL}/api/Orders`,newOrder,{
        headers :
       { 'Authorization' : `Bearer ${token}`}
    });
    return response.data;
};

const updateStatus = async (id) => {
  const token = localStorage.getItem('token')
  console.log(token,'here is me')
  const response = await axios.patch(`${API_BASE_URL}/api/Orders/complete/${id}`,{},
    {
    headers :
    { 'Authorization' : `Bearer ${token}`}
  });
  return response.data;

};

const useOrders = () => {
    const {data:orders,refetch} = useQuery({
        queryKey: ["orders"],
        queryFn:fetchOrders,
        refetchOnWindowFocus:false,
        retry:2
    });

const { mutateAsync: addOrder } = useMutation({
        mutationFn: postOrder,
        onSuccess: () => {
          console.log('Order created successfully');
          refetch();
          toast.success('Order created successfully!');
        },
        onError: (error) => {
          console.error('Error creating Order:', error);
          toast.error('Error creating Order');
        },
      });
      const { mutateAsync: markOrder } = useMutation({
        mutationFn: updateStatus,
        onSuccess: () => {
          console.log('Order marked successfully');
          refetch();
          toast.success('Order marked successfully!');
        },
        onError: (error) => {
          console.error('Error marking Order:', error);
          toast.error('Error marking Order');
        },
      });
    return {
        orders,
        refetch,
        addOrder,
        markOrder
    }
};
export default useOrders;