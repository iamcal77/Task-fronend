import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  TextBox,
  NumberBox,
  SelectBox,
  TextArea,
  Validator,

} from 'devextreme-react';
import { Button } from 'devextreme-react/button';
import { LoadIndicator } from 'devextreme-react/load-indicator';
import { PatternRule, RequiredRule,RangeRule } from 'devextreme-react/form';

const ProductForm = ({ 
  onCancel, 
  onSubmit, 
  initialData = {}
}) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
    category: '',
    status: 'available',
    ...initialData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const statusOptions = [
    { value: 'available', text: 'Available' },
    { value: 'out_of_stock', text: 'Out of Stock' },
  ];

  const categoryOptions = [
    'Vegetables',
    'Fruits',
    'Dairy',
    'Meat',
    'Grains',
    'Other'
  ];


  const handleFieldChange = (e) => {
    const { name, value } = e;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await onSubmit(formData); // If onSubmit is async
  } catch (error) {
    toast.error("Failed to submit");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="top-14 right-4 fixed bg-white w-[600px] h-[70vh] rounded-lg shadow-lg max-w-full overflow-y-auto z-10 p-6 flex flex-col justify-between">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4 bg-gray-50 rounded-t-lg">
          <h1 className="text-2xs font-semibold text-green-600">
            {initialData && Object.keys(initialData).length > 0 ? 'Edit Product' : 'Add New Product'}

          </h1>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className='mb-4'>
                <TextBox
                  name="name"
                  value={formData.name}
                  onValueChanged={(e) => handleFieldChange({ name: 'name', value: e.value })}
                  label="Product Name"
                  labelMode="floating"
                  stylingMode="filled"
                >
                  <Validator>
                    <RequiredRule message="Product name is required" />
                    <PatternRule
                      pattern={/^[a-zA-Z0-9\s\-&]+$/}
                      message="Only letters, numbers, spaces, hyphens and ampersands are allowed"
                    />
                  </Validator>
                </TextBox>
              </div>

              <div className='ml-2'>
                <SelectBox
                  name="category"
                  items={categoryOptions}
                  value={formData.category}
                  onValueChanged={(e) => handleFieldChange({ name: 'category', value: e.value })}
                  label="Category"
                  labelMode="floating"
                  stylingMode="filled"
                  searchEnabled={true}
                >
                  <Validator>
                    <RequiredRule message="Category is required" />
                  </Validator>
                </SelectBox>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <NumberBox
                  name="quantity"
                  value={formData.quantity}
                  onValueChanged={(e) => handleFieldChange({ name: 'quantity', value: e.value })}
                  label="Quantity"
                  labelMode="floating"
                  stylingMode="filled"
                  min={0}
                  showSpinButtons={true}
                >
                  <Validator>
                    <RequiredRule message="Quantity is required" />
                    <RangeRule min={0} message="Quantity must be positive" />
                  </Validator>
                </NumberBox>
              </div>

              <div className='ml-2'>
                <NumberBox
                  name="price"
                  value={formData.price}
                  onValueChanged={(e) => handleFieldChange({ name: 'price', value: e.value })}
                  label="Price"
                  labelMode="floating"
                  stylingMode="filled"
                  format="$ #,##0.##"
                  min={0}
                  step={0.01}
                  showSpinButtons={true}
                >
                  <Validator>
                    <RequiredRule message="Price is required" />
                    <RangeRule min={0} message="Price must be positive" />
                  </Validator>
                </NumberBox>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <SelectBox
                  name="status"
                  items={statusOptions}
                  value={formData.status}
                  onValueChanged={(e) => handleFieldChange({ name: 'status', value: e.value })}
                  label="Status"
                  labelMode="floating"
                  stylingMode="filled"
                  displayExpr="text"
                  valueExpr="value"
                >
                  <Validator>
                    <RequiredRule message="Status is required" />
                  </Validator>
                </SelectBox>
              </div>
            </div>

            <div className='mb-4'>
              <TextBox
                name="imageUrl"
                value={formData.imageUrl}
                onValueChanged={(e) => handleFieldChange({ name: 'imageUrl', value: e.value })}
                label="Image URL"
                labelMode="floating"
                stylingMode="filled"
              >
                <Validator>
                  <PatternRule
                    pattern={/^(https?:\/\/).+\.(jpg|jpeg|png|webp)$/i}
                    message="Must be a valid image URL (http/https and .jpg/.png/.webp)"
                  />
                </Validator>
              </TextBox>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t mt-4">
            <Button
              text="Cancel"
              onClick={onCancel}
              stylingMode="outlined"
              type="normal"
              className="min-w-[100px]"
              disabled={isSubmitting}
            />
            <Button
              text="Add Product"
              type="default"
              stylingMode="contained"
              className="min-w-[100px] bg-green-600 hover:bg-green-700"
              useSubmitBehavior={true}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <LoadIndicator
                  width={24}
                  height={24}
                  visible={true}
                  className="mr-2"
                />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;