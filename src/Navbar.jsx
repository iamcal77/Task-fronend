import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";


const Navbar = () => {
  return (
    <div className="bg-white shadow px-6 py-5 flex justify-between items-center sticky top-0 z-50 h-20 mb-5">
      <div className="flex-1 mx-10">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for products, categories..."
            className="w-full pl-5 pr-12 py-3 rounded-full border text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <IoIosNotificationsOutline className="text-gray-500 hover:text-green-600 w-6 h-7 cursor-pointer" />
        <FaRegCircleUser className="text-gray-500 hover:text-green-600 w-7 h-7 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
