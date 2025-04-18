import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import the toast library

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchResponses =async ()=>{
    const response = await axios.get(`${API_BASE_URL}/api/Query/history`);
    return response.data

}
const createResponse = async (newActivity) => {
  const response = await axios.post(`${API_BASE_URL}/api/Query`, newActivity);
  return response.data;
};

const deleteQuestion = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/Query/history/${id}`);
  return response.data;
};


// Custom hook
const useResponses = () => {
  const { data: responses, isLoading, error, refetch } = useQuery({
    queryKey: ['responses'],
    queryFn: fetchResponses,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: postQuestion } = useMutation({
    mutationFn: createResponse,
    onSuccess: () => {
      console.log('Question created successfully');
      refetch();
      toast.success('Question created successfully!');
    },
    onError: (error) => {
      console.error('Error creating Question:', error);
      toast.error('Error creating Question');
    },
  });

  const { mutateAsync: removeQuestion } = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      console.log('Question deleted successfully');
      refetch();
      toast.success('Question deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting Question:', error);
      toast.error('Error deleting Question');
    },
  });

  

  return {
    responses,
    isLoading,
    error,
    postQuestion,
    removeQuestion,
  };
};

export default useResponses;
