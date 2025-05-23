import React from 'react'
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Modal = ({isVisible, onClose, numero, correo}) => {
  if ( !isVisible ) return null;

  const handleClose = (e) => {
    if ( e.target.id === 'wrapper' ) onClose();
  }
  
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-75
          backdrop-blur-sm flex justify-center items-center' id='wrapper'
          onClick={handleClose}>
        <div className='w-[350px] md:w-[360px] lg:w-[410px] xl:w-[410px] flex flex-col'>
            <button className='text-[#e6c625] text-xl font-mono font-bold place-self-end' onClick={() => onClose()}>
                x
            </button>
            <div className="flex justify-center items-center h-[165px] md:h-[175px] lg:h-[210px] xl:h-[215px] bg-white py-5">
              <div className="font-mono   bg-data-cherry-400 
                    h-[130px] w-[315px] md:w-[325px] md:h-[140px] lg:w-[375px] lg:h-[175px] xl:w-[375px] xl:h-[180px]">
                      <div className=''>
                        <h1 className='font-jom text-center text-[#e6c625] text-3.5xl md:text-4xl lg:text-5xl mt-2'>
                          INFORMACIÓN DE CONTACTO
                        </h1>
                        <div className='flex justify-center items-center mt-1'>
                          <FaPhone size={17} color='#E6C725' className='mb-5'/>
                          <h1 className=' font-jom text-left text-white text-xl md:text-2xl lg:text-3xl -mt-4 mx-5 '>
                            TELEFONO: {numero}
                          </h1>
                        </div>
                        <div className='flex justify-center uitems-center mt-1'>
                        <IoIosMail size={17} color='#E6C725' className='-mt-2.5 md:-mt-2 lg:-mt-0.5 xl:-mt-1'/>
                          <h1 className=' font-jom text-left text-white text-xl md:text-2xl lg:text-3xl -mt-4 mx-5 '>
                            CORREO: {correo}
                          </h1>
                        </div>
                        
                      </div>
              </div>
              
                
            </div>
        </div>
            
      
    </div>
  )
}

export default Modal
