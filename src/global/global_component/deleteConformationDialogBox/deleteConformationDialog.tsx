// ConfirmationDialog.tsx
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useState } from "react";

interface ConfirmationDialogProps {
  onDelete: () => void;
  itemText: string;
}
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onDelete,
  itemText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    closeDialog();
  };

  return (
    <div className="relative inline-block text-left ">
      <button
        onClick={openDialog}
        className=" flex mr-4 bg-gray-200 hover:bg-red-600 focus:ring-1 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center hover:text-white">
        <CIcon icon={cilTrash} className="text-xl " />
      </button>
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block ">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0   sm:text-left">
                    <div className="heading flex">
                      <h3 className="text-lg font-medium text-gray-900">
                        Delete Item
                      </h3>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete{" "}
                        <span className="text-ri-orange text-lg font-bold">
                          {itemText}
                        </span>
                        ?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 mb-2 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button
                  onClick={closeDialog}
                  className=" w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 mb-2 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationDialog;
