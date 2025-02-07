// src/components/ActionButtons.js
import React from 'react';
import { FaTrash, FaEdit, FaPlus, FaCartArrowDown } from 'react-icons/fa';

const ActionButtons = ({ product, onAddToCart, onAddToList, onUpdate, onDelete }) => {
  return (
    <div className="flex mt-4 space-x-4">
      <button
        className={`flex items-center justify-center space-x-2 py-2 px-6 rounded-lg font-semibold text-white 
          ${product.stockQuantity > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'} 
          transition-all duration-300 transform hover:scale-105`}
        onClick={onAddToCart}
        disabled={product.stockQuantity <= 0}
      >
        <FaCartArrowDown className="w-5 h-5 text-orange-400" />
        <span>{product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
      </button>
      <button
        className="text-green-500 p-2 rounded-md transition-colors duration-200"
        onClick={onAddToList}
      >
        <FaPlus className="w-5 h-5" />
      </button>
      <button
        className="text-blue-500 p-2 rounded-md transition-colors duration-200"
        onClick={onUpdate}
      >
        <FaEdit className="w-5 h-5" />
      </button>
      <button
        className="text-red-500 p-2 rounded-md transition-colors duration-200"
        onClick={onDelete}
      >
        <FaTrash className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ActionButtons;
