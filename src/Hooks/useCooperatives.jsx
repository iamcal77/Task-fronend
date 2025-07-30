import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchCoop = async () => {
  const token = localStorage.getItem('token')
  console.log(token,'here is me')
  const response = await axios.get(`${API_BASE_URL}/api/Cooperatives`,
    {
    headers :
    { 'Authorization' : `Bearer ${token}`}
  });
  return response.data;

};
const useCooperatives = () => {
    const {data:cooperatives,refetch} = useQuery({
        queryKey: ["cooperatives"],
        queryFn:fetchCoop,
        refetchOnWindowFocus:false,
        retry:2
    });
    return {
        cooperatives,
        refetch
    }
}
export default useCooperatives;

