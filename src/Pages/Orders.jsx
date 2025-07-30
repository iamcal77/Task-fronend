
import { FaCheckCircle, FaClock, FaInfoCircle } from 'react-icons/fa';
import useOrders from '../Hooks/useOrders';
import ActionBar from '../ActionBar';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ConfirmDialog from '../ConfirmDialog';
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel } from 'devextreme-react/data-grid';
import { TbBorderSides } from 'react-icons/tb';

const Orders = () => {
  const { orders,markOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);



const handleComplete = () => {
  if (!selectedOrder) {
    toast.warning('Please select an order to complete.');
    return;
  }

  if (selectedOrder.status.toLowerCase() === 'completed') {
    toast.info('Order is already completed.');
    return;
  }

  setShowConfirm(true);
};
const handleConfirmOrder = async () => {
  try {
    await markOrder(selectedOrder.id);
  } catch (error) {
  } finally {
    setShowConfirm(false);
  }
};

const handleCancelOrder = () => {
  setShowConfirm(false);
};




  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
         <TbBorderSides className="w-6 h-6 text-yellow-600" />
         Orders
         </h2>
      <div className="overflow-x-auto">
       <ActionBar
         onAdd={false}
         onDelete={true}
         onEdit={true}
         onComplete={handleComplete}
         showExportToExcel={false}
         showExportToPDF={false}
         showAddButton = {false}
       />
        <DataGrid
          dataSource={orders}
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
          onSelectionChanged={({ selectedRowsData }) => {
            setSelectedOrder(selectedRowsData[0] || null);
          }}
          selection={{ mode: 'single' }}

        >
          <SearchPanel  visible={true} width={300} placeholder="Search..." />

          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />

          <Column dataField="buyerName" caption="Buyer Name" />
          <Column dataField="productName" caption="Product Name" />
          <Column dataField="totalPrice" caption="Potal Price" format="currency" />
          <Column
          dataField="status"
          caption="Status"
          cellRender={({ value }) => {
            const status = value?.toLowerCase();

            if (status === 'completed') {
              return (
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <FaCheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Completed</span>
                </div>
              );
            } else if (status === 'pending') {
              return (
                <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                  <FaClock className="w-4 h-4" />
                  <span className="hidden sm:inline">Pending</span>
                </div>
              );
            } else {
              return (
                <div className="flex items-center gap-1 text-gray-500">
                  <FaInfoCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{value}</span>
                </div>
              );
            }
          }}
        />

        </DataGrid>
        <ConfirmDialog
          visible={showConfirm}
          title="Complete Order"
          message={`Mark"${selectedOrder?.productName}" as complete?`}
          onConfirm={handleConfirmOrder}
          onCancel={handleCancelOrder}
        />

      </div>
    </div>
  );
};

export default Orders;
