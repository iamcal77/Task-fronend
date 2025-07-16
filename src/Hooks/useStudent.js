import { useQuery } from "@tanstack/react-query";
import axios from "axios"
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAllStudent =async()=>{
    const response = await axios.get(`${API_BASE_URL}/api/student`);
    return response.data;
};
const useStudents = ()=>{
    const {data:students,refetch} = useQuery({
        queryKey:['students'],
        queryFn:getAllStudent,
        retry:2,
        refetchOnWindowFocus:false
    });
    return {
       students,
       refetch 
    }
};
export default useStudents