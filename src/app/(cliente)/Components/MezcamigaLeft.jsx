'use client'

import Image from 'next/image';
import { IoMdContact } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Modal from '../Components/Modal';

export default function MezcamigaLeft({ asociada }){
    const [showModal, setShowModal] = useState(false); // Se ejecutará cuando cambie asociada.id

    return (
        <div className='flex flex-col items-center justify-center '>
            <h1 className='mt-4 drop-shadow-md font-jom text-[#ffb712] text-4xl sm:text-5xl md:text-6xl lg:text-7xl pt-4'>{asociada.nombre}</h1>
            <div className='flex justify-around items-center pb-12'>
                <div class='relative w-52 h-72 sm:w-64 sm:h-64 md:w-76 md:h-76 lg:w-96 lg:h-96  xl:w-128 xl:h-128 ml-3 xl:ml-6'>
                    <span class='absolute drop-shadow-2xl w-full h-full bg-[#d69600] rounded-xl translate-x-1/40 translate-y-1/40'/>
                    <img alt='member image' className='object-cover object-center relative w-full h-full rounded-xl' src={asociada.imagen}/>
                </div>

                <div className='justify-center w-2/3 h-full items-center text-center px-3 md:px-4 xl:px-10'>
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
                
            </div>

            <h1 className='drop-shadow-md font-jom text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl '>MARCAS</h1>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)} numero={asociada.numero} correo={asociada.correo}/>
        </div>
    );
}