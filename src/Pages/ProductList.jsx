
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useProducts from '../Hooks/useProducts';
import { toast } from 'react-toastify';
import ActionBar from '../ActionBar';
import ProductForm from '../Forms/ProductForm';
import { useState } from 'react';
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel } from 'devextreme-react/data-grid';

const ProductList = () => {
  const { products,addProduct } = useProducts();
const[showForm , setShowForm] = useState(false);
  

  const toggleForm = () => {
    setShowForm (prev => ! prev)
  };

  const handleSubmit = (newProduct) => {
    addProduct (newProduct);
    toggleForm();
  };


  const handleDelete = (rowData) => {
  
    return toast.success("Done");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="overflow-x-auto">
         <ActionBar
          onAdd={()=>toggleForm()}
          onDelete={handleDelete}
          onEdit={handleDelete}
          showExportToExcel = {false}
          showExportToPDF = {false}
          />
          { showForm &&
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={toggleForm}
          />
          }
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
          <SearchPanel  visible={true} width={300} placeholder="Search..." />

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
            cellRender={({ value }) => {
                if (value.toLowerCase() === 'available') {
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
            }}
            />
          <Column
            dataField="farmer.name"
            caption="Farmer"
            calculateCellValue={(rowData) => rowData.farmer?.name || 'N/A'}
          />
        </DataGrid>
      </div>
    </div>
  );
};

export default ProductList;
