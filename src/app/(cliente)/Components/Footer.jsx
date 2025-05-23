'use client'

import { useState } from 'react';
import React from 'react'
import Link from 'next/link';
import mezcalerasIcon from '/public/logoPequeno.svg'
import { FaFacebook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Image from 'next/image'
import Modal from './Modal';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-deep-violet text-white font-roboto h-40">
      <div className="relative h-full w-full -bottom-16">
        <Image
          src={mezcalerasIcon}
          layout="fill"
          objectFit="contain"
          className="z-10"
        />
      </div>
      <div className="bg-data-cherry-400 flex flex-col justify-center px-24 pt-20 pb-10 text-center relative ">
        <div className="flex font-semibold justify-center text-sm md:text-xl">
          <p>INFORMACIÓN DE CONTACTO Y REDES SOCIALES</p>
        </div>
        <div className="fill-white flex justify-center pt-2 items-center mx-2">
          <hr className="w-2/5" />
            <Link href={'https://www.facebook.com/mujeresmezcalerasdemichoacan/'}>
              <div className='px-5 icono-facebook'>
                <FaFacebook className='text-2xl sm:text-3xl lg:text-4xl' color='#ffff'/>
              </div>
            </Link>
            <div className='icono-phone' onClick={() => setShowModal(true)}>
                <FaPhone className='text-2xl sm:text-3xl lg:text-4xl' color='#ffff'/>
            </div>
            <div className='pl-5 icono-mail' onClick={() => setShowModal(true)}>
                <IoIosMail className='text-3xl sm:text-4xl lg:text-5xl' color='#ffff'/>
            </div>
            <Link href={'https://www.google.com/maps/place/Mezcal+Armonia/@19.6901966,-101.1793538,15.5z/data=!4m14!1m7!3m6!1s0x842d0e761f9cdce5:0xdaa0169c68492caa!2sMezcal+Armonia!8m2!3d19.6889125!4d-101.1786499!16s%2Fg%2F11f3dnwq5c!3m5!1s0x842d0e761f9cdce5:0xdaa0169c68492caa!8m2!3d19.6889125!4d-101.1786499!16s%2Fg%2F11f3dnwq5c?entry=ttu'}>
              <div className='px-5 icono-maps'>
                <FaLocationDot className='text-2xl sm:text-3xl lg:text-4xl' color='#ffff'/>
              </div>
            </Link>
          <hr className="w-2/5" />
        </div>
        <div className="flex justify-center text-xm md:text-sm pt-5 ">
          <p>Sitio Web creado por DATA TEAM</p>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} numero='443 *** ****' correo='********@gmail.com'/>
    </div>
  )
}

export default Footer
