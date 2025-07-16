import { DataGrid } from 'devextreme-react'
import { Column } from 'devextreme-react/data-grid'
import React from 'react'
import useStudents from '../Hooks/useStudent'
import ActionBar from '../ActionBar'
import { toast } from 'react-toastify'

const Students = () => {
    const {students} = useStudents();
    const hanldeAdd = ()=>{
        return toast.error('Not implemeted')
    }

  return (
    <div>
        <ActionBar
        onAdd={hanldeAdd}
        onDelete={""}
        onEdit={""}
        />
        <div className='mt-11'>
             <DataGrid
        dataSource={students}
        >
            <Column dataField='name'caption='Name'/>
            <Column dataField='age'caption='Age'/>
            <Column dataField='present'caption='IsPresent'/>
            <Column dataField='arrivalDate'caption='ArrivalDate'/>



        </DataGrid>
        </div>
    </div>
  )
}

export default Students