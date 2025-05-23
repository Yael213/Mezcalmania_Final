'use client'
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { TfiWorld } from "react-icons/tfi";
import Link from 'next/link';

const MarcaRight = (info) => {
  return (
    <div className='flex bg-[#F3E8E0] flex-col items-center justify-center pb-18'>
        <h1 className='mt-4 font-jom text-[#5A2F31] text-4xl sm:text-5xl md:text-6xl lg:text-7xl pt-4'>{info.nombre}</h1>
        <div className='flex justify-around items-center'>
            <div className='justify-center w-2/3 items-center text-center px-3 d:px-4 xl:px-10'>
                <h1 className='font-roboto font-light text-[#424242] text-xm leading-tight sm:text-sm md:text-base lg:text-xl xl:text-2xl'>
                    {info.bio}
                </h1>
                <div className='flex justify-center items-center pt-2 md:pt-8'>
                    <Link href={info.Facebook}>
                        <div className='px-3 icono-marcasR1'> 
                            <FaFacebook className='text-xl sm:text-2xl lg:text-4xl' color='#5A2F31'/>
                        </div>
                    </Link>
                    <Link href={info.Instagram}>
                        <div className='px-3 icono-marcasR2' > 
                            <ImInstagram className='text-xl sm:text-2xl lg:text-4xl' color='#2E2E2E'/>
                        </div>
                    </Link>
                    <Link href={info.Pagina}>
                        <div className='px-3 icono-marcasR1'> 
                            <TfiWorld className='text-2xl sm:text-3xl lg:text-4xl ' color='#5A2F31'/>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='relative inline-block group h-full w-1/3 mr-3 xl:mr-6'>
                <span class='absolute w-full h-full bg-[#5A2F31] rounded-xl -translate-x-1/40 translate-y-1/40'/>
                <Image alt='brand image' className={`relative w-full h-full rounded-xl bg-${info.color}`} src={`/Images/Marcas/${info.foto}`} width={info.width} height={info.height}/>
            </div>
        </div>
    </div>
  )
}

export default MarcaRight
