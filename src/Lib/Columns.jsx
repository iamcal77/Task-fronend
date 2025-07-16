// src/components/ProductColumns.jsx
import { Column } from 'devextreme-react/data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import StatusCell from './StatusCell';

const ProductColumns = ({ onEdit, onDelete }) => (
  <>
    <Column dataField="name" caption="Name" />
    <Column dataField="quantity" caption="Quantity" />
    <Column dataField="price" caption="Price" format="currency" />

    <Column
      dataField="imageUrl"
      caption="Image"
      cellRender={({ value }) => (
        <img src={value} alt="Product" className="w-12 h-12 object-cover rounded-md" />
      )}
    />

    <Column dataField="category" caption="Category" />

    <Column
      dataField="status"
      caption="Status"
      cellRender={({ value }) => <StatusCell value={value} />}
    />

    <Column
      dataField="farmer.name"
      caption="Farmer"
      calculateCellValue={(rowData) => rowData.farmer?.name || 'N/A'}
    />

    <Column
      caption="Actions"
      width={100}
      cellRender={({ data }) => (
        <div className="flex gap-3 justify-center items-center">
          <button onClick={() => onEdit(data)} title="Edit">
            <FaEdit className="text-blue-600 hover:text-blue-800 w-5 h-5 transition-colors duration-200" />
          </button>
          <button onClick={() => onDelete(data)} title="Delete">
            <FaTrash className="text-red-600 hover:text-red-800 w-5 h-5 transition-colors duration-200" />
          </button>
        </div>
      )}
    />
  </>
);

export default ProductColumns;
