// Modal.js
import React from 'react';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-5 rounded z-50">
        <h2 className="text-lg mb-4">{title}</h2>
        <div className='mb-4'>{children}</div>
        <button onClick={onClose} className="mt-4 bg-fuchsia-950 text-white px-4 py-2 rounded justify-center items-center">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default Modal;