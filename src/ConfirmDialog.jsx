import React from 'react';
import { Popup } from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';

const ConfirmDialog = ({ visible, title, message, onConfirm, onCancel }) => {
  return (
    <Popup
      visible={visible}
      dragEnabled={false}
      hideOnOutsideClick={true}
      showCloseButton={true}
      showTitle={true}
      title={title}
      onHiding={onCancel}
      width={400}
      height={200}
    >
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="text-base">{message}</div>
        <div className="flex justify-end mt-4 space-x-3">
          <Button text="Cancel" onClick={onCancel} />
          <Button
            text="Confirm"
            type="default"
            stylingMode="contained"
            onClick={onConfirm}
          />
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmDialog;
