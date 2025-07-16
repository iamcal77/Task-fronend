import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const StatusCell = ({ value }) => {
    console.log("StatusCell received:", value); 
  if (value?.toLowerCase() === 'available') {
    return (
      <div className="flex items-center gap-1 text-green-600">
        <FaCheckCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Available</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1 text-red-600">
        <FaTimesCircle className="w-4 h-4" />
        <span className="hidden sm:inline">{value}</span>
      </div>
    );
  }
};

export default StatusCell;
