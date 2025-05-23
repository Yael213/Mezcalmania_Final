"use client"

import { useState } from "react";
import Image from "next/image";
import UpdateMarca from "./UpdateMarca";

const CardMarca = ({ marca }) => {
    const arreglo = marca;
    const [showModal, setShowModal] = useState(false);

    return(
        <div>
            <div className='border-3 bg-[#FBFBFB] rounded-3xl drop-shadow-xl'>
                <div className="relative">
                    <div className="h-[340px]">
                        <Image
                            src={marca.imagen}
                            alt={marca.nombre}
                            layout="fill"
                            className="p-2 rounded-3xl object-cover"
                        />
                    </div>
                </div>             
                
                
                
                <button className='px-6 py-2 w-full h-10 bg-data-cherry-500 hover:bg-data-cherry-400 rounded-3xl text-white font-outfit transform ' onClick={() => setShowModal(true)}>
                    Editar informacion
                </button>
            </div>
            <UpdateMarca isVisible={showModal} onClose={() => setShowModal(false)} info={arreglo}/>
        </div>
        
    )
}

export default CardMarca;
