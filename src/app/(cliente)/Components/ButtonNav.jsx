import React from 'react'
import Link from 'next/link'

const ButtonNav = (info) => {
    return (
    <div>
        <Link href={`${info.href}`}>
            <button className='relative inline-block w-28 md:w-22 lg:w-28 h-8 md:h-6 lg:h-8 font-medium group'>
                <span className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform ${info.translate} ${info.hbg} group-hover:-translate-x-0 group-hover:-translate-y-0`}></span>
                <span className={`absolute inset-0 w-full h-full ${info.bg} border-2 ${info.border} ${info.grouphborder} ${info.grouphbg}`}></span>
                <span className="relative text-white font-outfit text-base md:text-sm lg:text-base group-hover:text-white">{info.desc}</span>
            </button>
        </Link>
    </div>
    )
}

export default ButtonNav
