import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import ActionBar from '../ActionBar';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ChatDetails() {
  const [question, setQuestion] = useState(null);
  const { id } = useParams(); // Get the task ID from the URL
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      
          const response = await axios.get(`${API_BASE_URL}/api/Query/history/${id}`);
          setQuestion(response.data);
          setLoading(false);
    };

    fetchQuestionDetails();
  }, [id]);

  return (
    <div>
      <ActionBar
        showBackButton={true}
        showDeleteButton={false}
        showEditButton={false}
        showAddButton={false}
        showExportToExcel={false}  
      />

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold text-green-500 mb-6 mt-7">Question Details</h1>

          {/* Tailwind-styled Details Section */}
          <div id="page-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Question ID:</span>
                <span className="text-gray-900">{question.id}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Question:</span>
                <span className="text-gray-900">{question.question}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-gray-700 w-40 flex-shrink-0">Answer:</span>
                <div className="text-gray-900 whitespace-pre-wrap break-words max-w-full">
                  {question.answer}
                </div>
              </div>

              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Time Stamp:</span>
                <span className="text-gray-900">
                  {new Date(question.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatDetails;
