'use client'
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { TfiWorld } from "react-icons/tfi";
import Link from 'next/link';



const ModalMarcas = ({isVisible, onClose}, {info}) => {
  if ( !isVisible ) return null;

  const handleClose = (e) => {
    if ( e.target.id === 'wrapper' ) onClose();
  }

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-75
          backdrop-blur-sm flex justify-center items-center' id='wrapper'
          onClick={handleClose}>
        <div className='w-screen px-8 flex flex-col '>
            <button className='text-[#fff] text-xl font-mono font-bold place-self-end' onClick={() => onClose()}>
                x
            </button>
            
            <div className='flex rounded-md bg-[#D1A42E] flex-col items-center justify-center pb-18'>
            <h1 className='mt-4 font-jom text-[#5A2F31] text-4xl sm:text-5xl md:text-6xl lg:text-7xl pt-4'>{info.marca.nombre}</h1>
                <div className='flex justify-around items-center'>

                    <div className='relative inline-block group h-full w-1/3 ml-3 xl:ml-6'>
                        <span class='absolute w-full h-full bg-[#5A2F31] rounded-xl translate-x-1/40 translate-y-1/40'/>
                        <Image alt='brand image' className='relative w-full h-full rounded-xl' src={info.imagen} width={1000} height={1000}/>
                    </div>
                
                    <div className='justify-center w-2/3 h-full items-center text-center px-3 md:px-4 xl:px-10'>
                        <h1 className='font-roboto font-light text-[#fffdfc] text-xm leading-tight sm:text-sm md:text-base lg:text-xl xl:text-2xl'>
                            {info.descripcion}
                        </h1>
                        <div className='flex justify-center items-center pt-2 md:pt-8'>
                            <Link href='/'>
                                <div className='px-3 icono-marcasR3'> 
                                    <FaFacebook className='text-xl sm:text-2xl lg:text-4xl' color='#ffff'/>
                                </div>
                            </Link>
                            <Link href='/'>
                                <div className='px-3 icono-marcasR1' > 
                                    <ImInstagram className='text-xl sm:text-2xl lg:text-4xl' color='#5A2F31'/>
                                </div>
                            </Link>
                            <Link href='/'>
                                <div className='px-3 icono-marcasR3'> 
                                    <TfiWorld className='text-2xl sm:text-3xl lg:text-4xl ' color='#ffff'/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            
      
    </div>
  )
}

export default ModalMarcas
