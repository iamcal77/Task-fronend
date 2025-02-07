import React from 'react';
import useProducts from "../Hooks/useProducts";
import ActionButtons from '../ActionButtons';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductPage = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Error: {error.message}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center text-xl text-gray-500">No products available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-full h-48 bg-gray-200 mb-6 rounded-md flex items-center justify-center">
              {product.imageUrl ? (
                <img
                  src={`${API_BASE_URL}${product.imageUrl}`}  
                  alt={product.name}
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <span className="text-5xl text-gray-600">{product.name[0]}</span>
              )}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 truncate">{product.name}</h2>
            <p className="text-gray-500 mb-4 text-sm">{product.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              <span className="text-sm text-gray-600">In Stock: {product.stockQuantity}</span>
            </div>
            <ActionButtons
              product={product}
              onAddToCart={() => alert(`Added ${product.name} to cart`)}
              onAddToList={() => alert(`Added ${product.name} to another list`)}
              onUpdate={() => alert(`Updated ${product.name}`)}
              onDelete={() => alert(`Deleted ${product.name}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
