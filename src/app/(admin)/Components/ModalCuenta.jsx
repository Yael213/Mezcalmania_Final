import React, { useState } from 'react';

const ModalCuenta = ({ isOpen, onClose }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lógica para enviar el formulario de nueva cuenta bancaria
    console.log('Formulario enviado:', { accountNumber, accountHolder });
    alert("La nueva cuenta ha sido registrada con éxito.");

    // Resetea el formulario
    setAccountNumber('');
    setAccountHolder('');

    // Cierra el modal
    onClose();
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <div className="relative bg-white rounded-lg px-4 py-6 sm:max-w-lg sm:w-full">

          <h2 className="text-lg font-medium mb-4">Nueva Cuenta Bancaria</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Número de Cuenta</label>
              <input type="text" id="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="mt-1  h-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="accountHolder" className="block text-sm font-medium text-gray-700 -10">Nombre del Titular</label>
              <input type="text" id="accountHolder" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div className="flex justify-end mt-9">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800">Guardar</button>
              <button type="button" className="ml-2 border text-white border-gray-300 px-4 py-2 rounded-md" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCuenta;