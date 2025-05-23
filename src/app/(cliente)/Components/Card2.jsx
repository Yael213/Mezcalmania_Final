import Image from 'next/image'
import Link from 'next/link'

const Card = (mezcal) => {   
    return(
        <div>
            <div className='relative justify-between w-[296px] h-[332px]'>
                <div className='absolute inset-0 w-[296px] h-[332px] brightness-50'>
                    <Image src="/Images/BG-AGAVE.jpg" layout="fill" />
                </div>
                <div className=''>
                    <Image src={mezcal.foto} alt={mezcal.nombre} sizes="90%" layout='fill' objectFit='contain' className='py-6'/>
                </div>
            </div>
            <div className='flex justify-center -mt-5'>
                <Link href={'/producto/' + mezcal.id}>
                    <button className={`px-6 py-2 ${mezcal.color} text-white font-outfit transform hover:-translate-y-2 transition duration-400 ho`}>
                        CONOCER MAS
                    </button>
                </Link>
            </div>
        </div>
        
        
    )
}

export default Card;

