import React from 'react'
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";


const ModalImage = ({isVisible, onClose, ruta}) => {
  if ( !isVisible ) return null;

  const handleClose = (e) => {
    if ( e.target.id === 'wrapper' ) onClose();
  }

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-35
    backdrop-blur-md flex flex-col justify-center items-center' id='wrapper'
    onClick={handleClose}> {/*lg:{max-h-fit w-auto max-w-6xl h-9/10 mx-auto}*/}
      <div className="max-w-sm max-h-9.5/10 my-auto md:max-w-2xl md:h-7/10 md:mx-auto lg:max-w-4xl lg:h-8/10 lg:mx-auto xl:max-w-6xl xl:h-9/10 xl:mx-auto }">
            <img 
              src={ruta}
              alt="Imagen en grande"
              className="w-full h-full"
            />
          </div>
    </div>
  )
}

export default ModalImage

