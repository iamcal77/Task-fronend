import { DataGrid } from 'devextreme-react';
import useCooperatives from '../Hooks/useCooperatives';
import { Column, MasterDetail, Pager, Paging, SearchPanel } from 'devextreme-react/data-grid';
import CooperativeDetail from './CooperativeDetail';
import { FaChartBar } from 'react-icons/fa';

const CooperativesPage = () => {
  const { cooperatives } = useCooperatives();

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
        <FaChartBar className="w-6 h-6 text-red-500" />
        Cooperatives
        </h2>


        <DataGrid
          dataSource={cooperatives}
          keyExpr={"id"}
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

          <Column dataField="id" caption="ID" width={50} />
          <Column dataField="name" caption="Cooperative Name" />
          <Column dataField="location" caption="Location" />
          <Column dataField="description" caption="Description" />
          <Column dataField="leader.name" caption="Leader" />

          <MasterDetail
            enabled={true}
            component={CooperativeDetail}
          />
        </DataGrid>
     
    </div>
  );
};

export default CooperativesPage;
