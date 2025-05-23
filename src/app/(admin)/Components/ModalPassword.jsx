import React, { useState } from 'react';

const ModalPassword = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica para enviar el formulario de cambio de contraseña

    if(password === confirmPassword){
      console.log('Formulario enviado:', { password, confirmPassword });
      alert("La accion se realizo con exito. CORRECTO");
      onClose();

    }else{

      console.log('Formulario enviado:', { password, confirmPassword });
      alert("ERROR. Las contraseñas difieren. Introdusca nuevamente la contrseña");
      setPassword('');
      setConfirmPassword('');
      
    }

  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <div className="relative bg-white rounded-lg px-4 py-6 sm:max-w-lg sm:w-full">

          <h2 className="text-lg font-medium mb-4">Cambiar contraseña</h2>

          <form onSubmit={handleSubmit} id='formulario1'>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña nueva</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full h-10 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full h-10 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div className="flex justify-end mt-9">
              <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-900">Guardar</button>
              <button type="button" className="ml-2 border border-gray-300 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-900" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPassword;
