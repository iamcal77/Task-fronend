import { DataGrid } from 'devextreme-react'
import { Column, FilterRow, Paging } from 'devextreme-react/data-grid'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import QuestionsForm from '../Forms/QuestionsForm'
import ActionBar from '../ActionBar'
import { FcDataProtection } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import useResponses from '../Hooks/useResponse'

const ChatResponses = () => {
    const{responses,postQuestion,removeQuestion} = useResponses();
    const[showForm , setShowForm] = useState(false);
    const[ selectedRow,setSelectedRow] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const navigate = useNavigate();

    

    const toggleForm =()=>{
        setShowForm(prev=>!prev);
    }
    const handleSubmit=(newQuestion)=>{
        postQuestion(newQuestion);
        toggleForm();
    }
    const handleDelete =()=>{
        if(!selectedRow)
        {
            return toast.error("No Question Selected")
        }else
        {
            removeQuestion(selectedRow.id)
            .catch((error)=>{
                console.error(error)
            })
        }
    }
    const handleEdit =() => {
    
            if(!selectedRow)
            {
                return toast.error('select Question to edit')
            }
            else{
                setEditingQuestion(selectedRow)
                setShowForm(true);
            }
        };
        const handleDetailsClick = (id) => {
            navigate(`/chat/${id}`);
          };
    
  return (
    <div className='min-h-screen p-8'>

        <ActionBar
        onAdd={()=>toggleForm()}
        onDelete={handleDelete}
        onEdit={handleEdit}
        />
         <h1 className="text-green-500 text-xl flex items-center">
                <FcDataProtection />
                   <span className="ml-2"> Questions</span>
                    </h1>
        {showForm&&
        <QuestionsForm
        onCancel={toggleForm}
        onSubmit={handleSubmit}
        initialData={editingQuestion}

        />
        }
        <div className='mt-10 fixed w-full mx-auto'>
            <DataGrid
            dataSource={responses}
            onRowClick={(e)=>setSelectedRow(e.data)}
            rowAlternationEnabled={true}
            onRowDblClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id);
                }
              }}

            >
        <FilterRow visible={true} />
        <Paging defaultPageSize={10} />
        <Column dataField="question" caption="User Question" />
        <Column dataField="answer" caption="ChatGPT Answer" />
        <Column dataField="timestamp" caption="Timestamp" dataType="datetime" />
            </DataGrid>
        </div>

    </div>
  )
}

export default ChatResponses