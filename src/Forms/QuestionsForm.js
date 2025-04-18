import { TextBox } from 'devextreme-react/text-box';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const QuestionsForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    question: '',
    ...initialData,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question) {
      return toast.error('All Fields required');
    }
    onSubmit(formData);
  };

  return (
    <div className="top-14 right-4 fixed bg-white w-[600px] h-[70vh] rounded-lg shadow-lg max-w-full overflow-y-auto z-10 p-6 flex flex-col justify-between">
      <h1 className="text-green-500 text-xl mb-4">Question Form</h1>

      <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-between">
        <div className="flex-grow">
          <TextBox
            name="question"
            id="question"
            value={formData.question}
            onValueChanged={(e) =>
              handleInputChange({ target: { name: 'question', value: e.value } })
            }
            label="Question"
            stylingMode="outlined"
            className="w-full"
          />
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-red-500 text-xl px-4 py-2 border border-red-500 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 text-xl px-6 py-2 rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionsForm;
