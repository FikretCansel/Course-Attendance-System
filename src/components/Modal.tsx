import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" style={{zIndex:1000}}>
      <div className="bg-white rounded-lg shadow-lg p-5 w-1/3 max-md:w-full">
      <div className='flex justify-end'>
        <button className="button bg-red-500 text-gray-600" onClick={onClose}>
          Close
        </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
