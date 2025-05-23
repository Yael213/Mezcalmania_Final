'use client'
import React, { useState, useEffect } from 'react';
import Modal from '../Components/Modal';
import ModalPassword from '../Components/ModalPassword';
import ModalCuenta from '../Components/ModalCuenta';
import './configuracion.css';

const divisorVisual = () => {
  return (
    <div className='bg-slate-700 w-full h-1'>
    </div>
  );
};

const Configuracion = () => {


  {/* Modal normal*/}

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const handleOpenModal = (title, content) => {
    setModalContent({ title, content });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  {/* Modal Password */}

  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };



  {/* Modal Password */}

  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  
  

  return (
    <div className='font-roboto bg-[#E1DDDD] text-black w-full h-full z-10'>
      <h1 className=''>Configuración</h1>
      {/* Aqui inicia el espacio en blanco */}
      <div className='espaciado'>

          <div className='relative'>

            {/* Espacio para config, General */}
            <div className='contenedor'>
              <h2 className=''>General</h2><br/>
              
              <div className='zona0'>
                <div className='zona1'>
                  <p className=''>Reiniciar cuenta del dashboard</p>
                </div>

                <divisorVisual/>

                <div className='zona2'>
                  <p>Toma en cuanta que al activar esta opcion el contador del dashbord iniciara desde 0 y el contador actual se guardara y solo sera unicamente para lectura</p>
                </div>
                <div className='zona3'>
                  <button type="button" onClick={() => handleOpenModal('Reiniciar cuenta del dashboard', 'Toma en cuenta que al activar esta opción el contador del dashboard iniciará desde 0 y el contador actual se guardará y solo será únicamente para lectura.')}>
                    Reiniciar
                  </button>
                </div>
              </div>

              <div className='zona0'>
                <div className='zona1'>
                  <p className=''>Cambiar contraseña</p>
                </div>
                <div className='zona2'>
                  <p>Al aceptar esta opcion, usted actualizara su contraseña de la cuanta de adminitrador.</p>
                </div>
                <div className='zona3'>
                  <button type="button" onClick={openModal1}>
                    Cambiar Contraseña
                  </button>
                  {isModalOpen1 && <ModalPassword isOpen={isModalOpen1} onClose={closeModal1} />}
              </div>
              </div>

            </div>

            {/* Espacio para config. Cuentas de pago */}
            <div className='contenedor'>
              <h2 className=''>Pagos</h2><br/>
              <div className='zona0'>
                <div className='zona1'>
                  <p className=''>Cuenta de para pagos</p>
                </div>
                <div className='zona2'>
                  <p>Asignar nueva cuenta para nuevos pagos. Si modifica esta opción estará conciente que los pagos de compras llegarán a otra cuenta diferente a la asignada.</p>
                </div>
                <div className='zona3'>
                  <button type="button" onClick={openModal2}>
                    Asignar nueva cuenta
                  </button>
                  {isModalOpen2 && <ModalCuenta isOpen={isModalOpen2} onClose={closeModal2} />}
                </div>

              </div>

              <div className='zona0'>
                <div className='zona1'>
                  <p className=''>Estado</p>
                </div>
                <div className='zona2'>
                  <p>En proceso</p>
                </div>
              </div>
              
            </div>

            {/* SEccion final, Notas y Boton de aceptar cambios */}
            <div className='contenedor'>
              <div className='notas'>
                <p className='text-black block'>Notas de de configuración</p>
                <p>Por su seguridad, todas las opciones de configuración quedan solo al alcance del administrador. Esto seguido de una notificación antes de cada acción realizada y después se la hará llegar al correo administrativo de los cambios realizados.</p>
              </div>
              <div className='botonFinal'>
              <button type="button" className='finalBoton' onClick={() => handleOpenModal('Aceptar todos los cambios', '¿Está seguro de que desea aceptar todos los cambios?')}>
                Aceptar todos los cambios
              </button>
            </div>
            </div>


        </div>        
      </div>

      <Modal show={modalOpen} onClose={handleCloseModal} title={modalContent.title}>
        <p>{modalContent.content}</p>
      </Modal>

    </div>
  )
}

export default Configuracion
