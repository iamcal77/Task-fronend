import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const fetchProducts = async()=>{
    const response = await axios.get(`${API_BASE_URL}/api/product`);
    console.table(response.data)
    return await response.data;
}

const useProducts = ()=>{
    const{data:products,isLoading,error,refetch} = useQuery({
        queryKey:['products'],
        queryFn:()=>fetchProducts(),
        retry:2,
        refetchOnWindowFocus:false
    })
    return {
        products,
        isLoading,
        error,
        refetch
        }

}
export default useProducts;