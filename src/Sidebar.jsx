// src/components/Sidebar.jsx
import { FaBox, FaChartBar, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TbBorderSides, TbTruckDelivery } from "react-icons/tb";
import { IoExtensionPuzzleOutline } from "react-icons/io5";



const Sidebar = () => {
  return (
    <div className="bg-white text-gray-700 w-50 min-h-screen flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-500">
        AgriConnect
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
           <li>
            <Link to="/users" className="flex items-center gap-3 hover:text-green-400">
              <FaUser /> Users
            </Link>
          </li>
          <li>
            <Link to="/products" className="flex items-center gap-3 hover:text-green-400">
              <FaBox className='text-green-500' /> Products
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center gap-3 hover:text-green-400">
              <FaChartBar className='text-red-500' /> Cooperatives
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center gap-3 hover:text-green-400">
              <TbBorderSides className='text-yellow-600' /> Orders
            </Link>
            </li>
            <li>
            <Link to="/users" className="flex items-center gap-3 hover:text-green-400">
              <TbTruckDelivery className='text-green-400' /> Deliveries
            </Link>
            </li>
            <li>
            <Link to="/users" className="flex items-center gap-3 hover:text-green-400">
              <IoExtensionPuzzleOutline className='text-blue-700' /> ExtensionPosts
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-2 text-red-400 hover:text-red-600">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
