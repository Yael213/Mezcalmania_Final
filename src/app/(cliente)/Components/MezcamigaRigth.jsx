'use client'
import Image from 'next/image';
import { IoMdContact } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import Link from 'next/link';
import { useState } from 'react'; 
import Modal from '../Components/Modal';

const MezcamigaRigth = ({ asociada }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    
    <div className='flex flex-col items-center justify-center'>
        <h1 className='mt-4 drop-shadow-md font-jom text-[#ffb712] text-4xl sm:text-5xl md:text-6xl lg:text-7xl pt-4'>{asociada.nombre}</h1>
        
        <div className='flex justify-around items-center pb-12'>
            <div className='justify-center w-2/3 h-full items-center text-center px-3 d:px-4 xl:px-10 '>
                <h1 className='font-roboto font-light text-white text-xm leading-tight sm:text-sm md:text-base lg:text-xl xl:text-2xl'>
                    {asociada.biografia}
                </h1>
                <div className='flex justify-center items-center py-1'>
                    <Link href=''>
                        <div className='px-3 icono-mezcaleras'> 
                            <FaFacebook className='text-xl sm:text-2xl lg:text-4xl' color='#ffb712'/>
                        </div>
                    </Link>
                    <Link href=''>
                        <div className='px-3 icono-mezcaleras' > 
                            <ImInstagram className='text-xl sm:text-2xl lg:text-4xl' color='#ffb712'/>
                        </div>
                    </Link>
                    <div className='px-3 icono-mezcaleras' onClick={() => setShowModal(true)}> 
                        <IoMdContact className='text-2xl sm:text-3xl lg:text-5xl' color='#ffb712'/>
                    </div>
                </div>
            </div>

            <div className='relative inline-block group h-full w-1/3 mr-3 xl:mr-6'>
                <span class='absolute drop-shadow-2xl w-full h-full bg-[#d69600] rounded-xl -translate-x-1/40 translate-y-1/40'/>
                <Image alt='member image' className='relative w-full h-full rounded-xl' src={asociada.imagen} width={3264} height={3264}/>
            </div>
        </div>

        <h1 className='drop-shadow-md font-jom text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl '>MARCAS</h1>

        <Modal isVisible={showModal} onClose={() => setShowModal(false)} numero={asociada.numero} correo={asociada.correo}/>
    </div>
  )
}

export default MezcamigaRigth
