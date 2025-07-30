import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchExtension = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_BASE_URL}/api/ExtensionPost`,
    {
    headers :
    { 'Authorization' : `Bearer ${token}`}
  });
  return response.data;

};
const useExtension = () => {
    const {data:gallery,refetch} = useQuery({
        queryKey: ["gallery"],
        queryFn:fetchExtension,
        refetchOnWindowFocus:false,
        retry:2
    });
    return {
        gallery,
        refetch
    }
}
export default useExtension;

