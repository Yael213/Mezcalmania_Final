import Image from 'next/image'
import Link from 'next/link'
import ButtonComprar from './ButtonComprar'
import { useState, useEffect } from 'react'

const Card = ({ mezcal }) => {
  const [product, setProduct] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/id?id=` + mezcal.id)
        const data = await response.json()
        console.log(data)
        setProduct(data.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
      }
    }
    fetchProduct()
  }, [mezcal.id])

  if (!product) {
    return <div>Error al cargar el producto</div>
  }

  return (
    <div className="">
      <Link href={'/producto/' + mezcal.id}>
        <div
          className="bg-gradient-to-t from-data-cherry-900/25 to-data-cherry-900/75 text-white rounded-3xl text-left
                                    md:w-96 w-80 h-[32rem] text-sm md:text-2xl px-8 shadow-2xl shadow-data-cherry-800 flex flex-col flex-shrink justify-between
                                    "
        >
          <div className="relative h-full lg:h-96 flex justify-center mt-[4%]">
            <Image
              src={mezcal.imagen}
              alt={product.nombre}
              sizes="90%"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="font-roboto font-bold text-2xl  mb-[4%] h-1/3">
            <h1 className="pb-1">4.78 (12)</h1>
            <h1 className="pb-2">{mezcal.nombre}</h1>
            <p className="text-data-yellow-200">
              $
              {mezcal.precio.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </Link>
      <ButtonComprar mezcal={mezcal} cantidad={1} />
    </div>
  )
}

export default Card
