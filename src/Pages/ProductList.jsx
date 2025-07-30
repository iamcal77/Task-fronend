import { FaBox, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useProducts from '../Hooks/useProducts';
import { toast } from 'react-toastify';
import ActionBar from '../ActionBar';
import ProductForm from '../Forms/ProductForm';
import { useState } from 'react';
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel } from 'devextreme-react/data-grid';
import useOrders from '../Hooks/useOrders';
import ConfirmDialog from '../ConfirmDialog'; 
import { IoReorderFourSharp } from 'react-icons/io5';

const ProductList = () => {
  const { products, addProduct } = useProducts();
  const { addOrder } = useOrders();
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showConfirm, setShowConfirm] = useState(false); 

  const toggleForm = () => setShowForm(prev => !prev);

  const handleSubmit = (newProduct) => {
    addProduct(newProduct);
    toggleForm();
  };

  const handleDelete = () => toast.success('Done');


  const handleConfirmOrder = async () => {
    if (!selectedProduct) return;

    const newOrder = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      buyerName: 'username',   
      status: 'Pending',
    };

    try {
      await addOrder(newOrder);
    } catch (error) {
      console.error('Order error:', error);
    } finally {
      setShowConfirm(false);
      setSelectedProduct(null);
    }
  };

  const handleCancelOrder = () => {
    setShowConfirm(false);
    setSelectedProduct(null);
  };

  const handlePlaceOrder = (product) => {
  if (product.status?.toLowerCase() !== 'available') {
    toast.error('This product is not available for ordering.');
    return;
  }

  setSelectedProduct(product);
  setShowConfirm(true);
};

  return (
    <div className="">
       <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
              <FaBox className="w-6 h-6 text-green-500" />
              Products
              </h2>
      <div className="overflow-x-auto">
        <ActionBar
          onAdd={toggleForm}
          onDelete={handleDelete}
          onEdit={handleDelete}
          showExportToExcel={false}
          showExportToPDF={false}
          showComplete = {false}
        />

        {showForm && (
          <ProductForm onSubmit={handleSubmit} onCancel={toggleForm} />
        )}

        <DataGrid
          dataSource={products}
          keyExpr="id"
          showBorders={true}
          columnAutoWidth={true}
          rowAlternationEnabled={true}
          showColumnLines={true}
          showRowLines={true}
          wordWrapEnabled={true}
          hoverStateEnabled={true}
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnResizingMode="widget"
          focusedRowEnabled={true}
          remoteOperations={false}
          className="shadow-md rounded-lg"
        >
          <SearchPanel visible={true} width={300} placeholder="Search..." />
          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />

          <Column dataField="name" caption="Name" />
          <Column dataField="quantity" caption="Quantity" />
          <Column dataField="price" caption="Price" format="currency" />
          <Column
            dataField="imageUrl"
            caption="Image"
            width={60}
            cellRender={({ value }) => (
              <img src={value} alt="Product" className="w-8 h-8 object-cover rounded" />
            )}
          />
          <Column dataField="category" caption="Category" />
          <Column
            dataField="status"
            caption="Status"
            cellRender={({ value }) =>
              value.toLowerCase() === 'available' ? (
                <div className="flex items-center gap-1 text-green-600">
                  <FaCheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Available</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <FaTimesCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{value}</span>
                </div>
              )
            }
          />
          <Column
            dataField="farmer.name"
            caption="Farmer"
            calculateCellValue={(rowData) => rowData.farmer?.name || 'N/A'}
          />
          <Column
            caption="Action"
            type="buttons"
            width={120}
            cellRender={({ row }) => {
              const product = row.data;
              const isAvailable = product.status?.toLowerCase() === 'available';

              return (
                <button
                  className={`px-3 py-1 rounded text-white text-sm ${isAvailable ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!isAvailable}
                  onClick={() => handlePlaceOrder(product)}
                >
                  <div className="flex items-center gap-1 text-white-600">
                  <IoReorderFourSharp className="w-4 h-4" />
                  <span className="hidden sm:inline">Order</span>
                </div>
                </button>
              );
            }}
          />

        </DataGrid>

        <ConfirmDialog
          visible={showConfirm}
          title="Confirm Order"
          message={`Are you sure you want to order "${selectedProduct?.name}"?`}
          onConfirm={handleConfirmOrder}
          onCancel={handleCancelOrder}
        />
      </div>
    </div>
  );
};

export default ProductList;
