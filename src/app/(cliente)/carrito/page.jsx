'use client'
import Image from 'next/image'
import { useState, useContext } from 'react'
import { CartContext } from '../context/cart'
import NumberInput from '../Components/NumberInput'

const RowMezcal = ({ mezcal, index, handleQuantityChange }) => {
  const handleCantidadChange = (newCantidad) => {
    handleQuantityChange(index, newCantidad)
  }
  if (mezcal.cantidadUsuario === 0) {
    return null
  }

  return (
    <tr className="shadow-inner shadow-data-cherry-800 rounded-3xl m-10 text-2xl text-center ">
      <td className="rounded-l-3xl bg-gradient-to-t from-data-cherry-900/25 to-data-cherry-900/75 ">
        <div className="relative h-44  flex items-center my-3">
          <Image
            src={mezcal.imagen}
            alt={mezcal.nombre}
            sizes="90%"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </td>
      <td className="bg-gradient-to-t from-data-cherry-900/25 to-data-cherry-900/75 ">
        {mezcal.nombre}
      </td>
      <td className="text-data-yellow-200 bg-gradient-to-t from-data-cherry-900/25 to-data-cherry-900/75">
        $
        {mezcal.precio.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="bg-gradient-to-t from-data-cherry-900/25 to-data-cherry-900/75">
        <NumberInput
          value={mezcal.cantidadUsuario}
          onChange={handleCantidadChange}
        />
      </td>
      <td className="text-data-yellow-200 bg-gradient-to-t from-data-cherry-900/25 to-data-cherry-900/75 rounded-r-3xl">
        $
        {(mezcal.precio * mezcal.cantidadUsuario).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  )
}

const ColumnMezcal = ({ mezcal, index, handleQuantityChange }) => {
  const handleCantidadChange = (newCantidad) => {
    handleQuantityChange(index, newCantidad)
  }
  if (mezcal.cantidadUsuario === 0) {
    return null
  }

  return (
    <div className="p-8 w-full shadow-inner shadow-data-cherry-800 rounded-3xl my-10 text-2xl text-center bg-gradient-to-t from-data-cherry-900/25 to-data-cherry-900/75 ">
      <tr className="">
        <td className="">
          <div className="relative h-44 my-3">
            <Image
              src={mezcal.imagen}
              alt={mezcal.nombre}
              sizes="90%"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </td>
      </tr>
      <tr>
        <th>Nombre</th>
        <td className="">{mezcal.nombre}</td>
      </tr>
      <tr>
        <th>Precio</th>
        <td className="text-data-yellow-200">
          $
          {mezcal.precio.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
      </tr>
      <tr>
        <th>Cantidad</th>
        <td className="">
          <NumberInput
            value={mezcal.cantidadUsuario}
            onChange={handleCantidadChange}
          />
        </td>
      </tr>
      <tr>
        {' '}
        <th>Subtotal</th>
        <td className="text-data-yellow-200">
          $
          {(mezcal.precio * mezcal.cantidadUsuario).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
      </tr>
    </div>
  )
}

const CardCarrito = ({ rows }) => {
  const totalSubtotal = rows.reduce((acc, row) => {
    return acc + row.precio * row.cantidadUsuario
  }, 0)

  const shippingCost = 199
  const subtotal = totalSubtotal
  const total = totalSubtotal + shippingCost

  return (
    <div
      className="card bg-gradient-to-t from-data-cherry-900/25 to-data-cherry-900/75 text-white rounded-3xl text-left
                          px-4 shadow-inner shadow-data-cherry-800 h-2/3 w-4/5 flex text-xl
                           "
    >
      <div className="px-2 h-full w-full items-start  py-10 ">
        <div>
          <h1 className="font-bold text-3xl py-4">
            ${' '}
            {subtotal.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        </div>
        <div className="">
          <div className="flex justify-between">
            <h1 className="">Subtotal</h1>
            <h1>
              ${' '}
              {subtotal.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h1>
          </div>
          <div className="flex justify-between pt-1 pb-2">
            <h1 className="font-xl">Envío</h1>${' '}
            {shippingCost.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <hr className="bg-data-cherry-500 border-0 py-[2px] rounded-3xl" />
        <div className="flex justify-between py-4">
          <h1 className="">Total</h1>
          <h1>
            ${' '}
            {total.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        </div>
        <div className="p-2 py-10">
          <a
            className="bg-data-cherry-500 w-full text-white h-10 xl:h-14 rounded-xl flex justify-center items-center"
            href="/finalizar-compra"
          >
            <div className="font-roboto font-semibold text-xl">
              <p className=" ">Finalizar compra</p>
            </div>
          </a>
        </div>
      </div>
      <div className="font-roboto font-bold flex items-center"></div>
    </div>
  )
}

const TableR = ({ mezcalRows, handleQuantityChange }) => {
  return (
    <table className="table-fixed border-separate border-spacing-0 border-spacing-y-5 align-middle p-10 w-full">
      <thead className="text-2xl py-10 ">
        <tr>
          <th className="w-1/12 "></th>
          <th className="w-1/4 ">PRODUCTO</th>
          <th className="w-1/6 ">PRECIO</th>
          <th className="w-1/12 ">CANT.</th>
          <th className="w-1/6 ">SUBTOTAL</th>
        </tr>
      </thead>
      <tbody className="">
        {mezcalRows.map((mezcal, index) => (
          <RowMezcal
            key={mezcal.id}
            mezcal={mezcal}
            index={index}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </tbody>
    </table>
  )
}

const TableC = ({ mezcalRows, handleQuantityChange }) => {
  return (
    <table className="table-fixed border-separate border-spacing-y-2 w-full p-10">
      <tbody className="">
        {mezcalRows.map((mezcal, index) => (
          <ColumnMezcal
            key={mezcal.id}
            mezcal={mezcal}
            index={index}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </tbody>
    </table>
  )
}

export default function Carrito() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotalItems,
    setQuantityProduct,
  } = useContext(CartContext)

  const [mezcalRows, setMezcalRows] = useState(cartItems)

  console.log(cartItems)

  const handleQuantityChange = (index, newQuantity) => {
    const updatedRows = [...mezcalRows]
    updatedRows[index].cantidadUsuario = newQuantity

    setQuantityProduct(updatedRows[index], newQuantity)
    setMezcalRows(updatedRows)
  }

  return (
    <div className="bg-deep-violet min h-full text-3xl font-bold font-roboto text-white flex flex-col md:flex-row ">
      <div className="md:w-2/3 md:m-14 m-2 ">
        <h1 className="text-5xl">MI CARRITO</h1>
        <div className="flex justify-center  h-full">
          <div className="md:hidden ">
            <TableC
              mezcalRows={mezcalRows}
              handleQuantityChange={handleQuantityChange}
            />
          </div>
          <div className="md:block hidden ">
            <TableR
              mezcalRows={mezcalRows}
              handleQuantityChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
      <div className="md:w-1/3 h-full flex items-center justify-center md:my-24 ">
        <CardCarrito rows={mezcalRows} />
      </div>
    </div>
  )
}
