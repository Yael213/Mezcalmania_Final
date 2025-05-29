'use client'
import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { CartContext } from '../context/cart'
import Image from 'next/image'
import { Sigmar } from 'next/font/google'

const RowMezcal = ({ mezcal }) => {
  const subtotal = mezcal.precio * mezcal.cantidadUsuario
  return (
    <tr className="">
      <td className="">
        <div className="relative h-28  flex items-center my-3">
          <Image
            src={mezcal.imagen}
            alt={mezcal.nombre}
            sizes="90%"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </td>
      <td className="">{mezcal.nombre}</td>
      <td>{mezcal.cantidadUsuario}</td>
      <td>
        $
        {subtotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  )
}

const FinalizarCompra = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext)

  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [fecha, setFecha] = useState('')
  const [totalPedido, setTotal] = useState('')
  const [tipoEnvio, setTipoEnvio] = useState('')
  const [nombre, setNombre] = useState('')
  const [nombreEmpresa, setNombreEmpresa] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [direccion, setDireccion] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [estado, setEstado] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [notas, setNotas] = useState('')
  const [renglonPedido, setRenglonPedido] = useState([])

  const [mezcalRows, setMezcalRows] = useState(cartItems)

  useEffect(() => {
    const newRenglonPedido = mezcalRows.map((mezcal) => ({
      cantidad: mezcal.cantidadUsuario,
      precio: mezcal.precio,
      mezcalId: mezcal.id,
    }))
    setRenglonPedido(JSON.stringify(newRenglonPedido))
  }, [mezcalRows])

  const validateForm = () => {
    const errors = {}
    
    if (!nombre) errors.nombre = "El nombre es obligatorio"
    if (!apellidoPaterno) errors.apellidoPaterno = "El apellido paterno es obligatorio"
    if (!direccion) errors.direccion = "La dirección es obligatoria"
    if (!ciudad) errors.ciudad = "La ciudad es obligatoria"
    if (!estado) errors.estado = "El estado es obligatorio"
    if (!codigoPostal) errors.codigoPostal = "El código postal es obligatorio"
    if (!telefono) errors.telefono = "El teléfono es obligatorio"
    if (!correoElectronico) {
      errors.correoElectronico = "El correo electrónico es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
      errors.correoElectronico = "El correo electrónico no es válido"
    }
    if (!tipoEnvio) errors.tipoEnvio = "Debes seleccionar un método de envío"
    if (!paymentMethod) errors.paymentMethod = "Debes seleccionar un método de pago"
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)

    const totalSubtotal = mezcalRows.reduce((acc, mezcalRows) => {
      return acc + mezcalRows.precio * mezcalRows.cantidadUsuario
    }, 0)

    const shippingCost = 199
    const total = tipoEnvio === '1' ? totalSubtotal + shippingCost : totalSubtotal

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          fecha: new Date(),
          total,
          tipoEnvio: parseInt(tipoEnvio),
          nombre,
          nombreEmpresa,
          apellidoPaterno,
          apellidoMaterno,
          direccion,
          ciudad,
          estado,
          codigoPostal,
          telefono,
          correoElectronico,
          notas,
          renglonPedido,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        const data = await res.json()
        console.log('Pedido created:', data)
        clearCart()
        window.location.assign('/finalizar-compra/' + data.id)
      } else {
        console.log('Error creating pedido')
        const errorData = await res.json()
        console.error('Error details:', errorData)
      }
    } catch (error) {
      console.error('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalSubtotal = mezcalRows.reduce((acc, mezcalRows) => {
    return acc + mezcalRows.precio * mezcalRows.cantidadUsuario
  }, 0)

  const shippingCost = 199
  const subtotal = totalSubtotal
  const total = tipoEnvio === '1' ? totalSubtotal + shippingCost : totalSubtotal

  return (
    <form onSubmit={handleSubmit}>
      <div className="font-roboto font-semibold bg-deep-violet h-max md:p-10">
        <h1 className="text-3xl font-bold p-10 ">FINALIZAR COMPRA</h1>
        <div className="flex md:flex-row flex-col h-full ">
          <div className="p-4 md:w-1/2  h-full">
            <h1 className="px-4 text-xl">DETALLES DEL ENVÍO</h1>
            <div className=" bg-gradient-to-t from-data-cherry-900/5 to-data-cherry-900/40  p-10 rounded-3xl text-white min-h-full h-screen border border-[#4E002B]/100 ">
              <div className="flex">
                <div className="w-1/2 flex flex-col px-2">
                  <label htmlFor="name">Nombre*</label>
                  <input
                    type="text"
                    id="name"
                    name="clientName"
                    placeholder="Nombre"
                    className={`bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 ${formErrors.nombre ? 'border border-red-500' : ''}`}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  {formErrors.nombre && <span className="text-red-500 text-sm">{formErrors.nombre}</span>}
                </div>
                <div className="w-1/2 flex flex-col px-2">
                  <label htmlFor="middlename">Apellidos*</label>
                  <div className="flex w-full">
                    <input
                      type="text"
                      id="middlenameFather"
                      name="clientMiddlenameFather"
                      placeholder="Paterno"
                      className={`bg-[#790344]/25  w-1/2 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 ${formErrors.apellidoPaterno ? 'border border-red-500' : ''}`}
                      onChange={(e) => setApellidoPaterno(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      id="middlenameMother"
                      name="clientMiddlenameMother"
                      placeholder="Materno"
                      className="bg-[#790344]/25  w-1/2 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200"
                      onChange={(e) => setApellidoMaterno(e.target.value)}
                    />
                  </div>
                  {formErrors.apellidoPaterno && <span className="text-red-500 text-sm">{formErrors.apellidoPaterno}</span>}
                </div>
              </div>
              <div className="">
                <div className="w-full flex flex-col px-2">
                  <label htmlFor="name">Nombre de la empresa</label>
                  <input
                    type="text"
                    id="name"
                    name="clientName"
                    placeholder="Nombre de la empresa"
                    className="bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200"
                    onChange={(e) => setNombreEmpresa(e.target.value)}
                  />
                </div>
              </div>
              <div className="">
                <div className="flex flex-col px-2">
                  <label htmlFor="address">Dirección del domicilio*</label>
                  <input
                    type="text"
                    id="address"
                    name="clientAddress"
                    placeholder="Número de la casa y nombre de la calle"
                    className={`bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 my-2 ${formErrors.direccion ? 'border border-red-500' : ''}`}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    id="address"
                    name="clientAddress"
                    placeholder="Apartamento, habitación, etc. (opcional)"
                    className="bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200"
                  />
                  {formErrors.direccion && <span className="text-red-500 text-sm">{formErrors.direccion}</span>}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex flex-col px-2">
                  <label htmlFor="city">Ciudad*</label>
                  <input
                    type="text"
                    id="city"
                    name="clientCity"
                    placeholder="Ciudad"
                    className={`bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 ${formErrors.ciudad ? 'border border-red-500' : ''}`}
                    onChange={(e) => setCiudad(e.target.value)}
                    required
                  />
                  {formErrors.ciudad && <span className="text-red-500 text-sm">{formErrors.ciudad}</span>}
                </div>
                <div className="w-1/2 flex flex-col px-2">
                  <label htmlFor="state">Estado*</label>
                  <input
                    type="text"
                    id="state"
                    name="clientState"
                    placeholder="Estado"
                    className={`bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 ${formErrors.estado ? 'border border-red-500' : ''}`}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                  />
                  {formErrors.estado && <span className="text-red-500 text-sm">{formErrors.estado}</span>}
                </div>
              </div>
              <div className="flex flex-col px-2 ">
                <label htmlFor="postal">Código postal*</label>
                <input
                  type="text"
                  id="postal"
                  name="clientPostalCode"
                  placeholder="Código postal"
                  className={`bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 ${formErrors.codigoPostal ? 'border border-red-500' : ''}`}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  required
                />
                {formErrors.codigoPostal && <span className="text-red-500 text-sm">{formErrors.codigoPostal}</span>}
              </div>
              <div className="flex flex-col px-2 ">
                <label htmlFor="phone">Teléfono*</label>
                <input
                  type="text"
                  id="phone"
                  name="clientPhone"
                  placeholder="Teléfono"
                  className={`bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 ${formErrors.telefono ? 'border border-red-500' : ''}`}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
                {formErrors.telefono && <span className="text-red-500 text-sm">{formErrors.telefono}</span>}
              </div>
              <div className="flex flex-col px-2">
                <label htmlFor="email">Correo electrónico*</label>
                <input
                  type="email"
                  id="email"
                  name="clientEmail"
                  placeholder="Correo electrónico"
                  className={`bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 ${formErrors.correoElectronico ? 'border border-red-500' : ''}`}
                  onChange={(e) => setCorreoElectronico(e.target.value)}
                  required
                />
                {formErrors.correoElectronico && <span className="text-red-500 text-sm">{formErrors.correoElectronico}</span>}
              </div>
              <div>
                <div className="flex flex-col px-2">
                  <label htmlFor="">Notas de la entrega</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200"
                    onChange={(e) => setNotas(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/2 min-h-full">
            <h1>DETALLES DEL PEDIDO</h1>
            <div className="bg-gradient-to-t from-data-cherry-900/5 to-data-cherry-900/40 p-10 rounded-3xl text-white  border border-[#4E002B]/100 ">
              <div className="text-left">
                <table className="">
                  <thead>
                    <tr className="text-center">
                      <th className=""></th>
                      <th className="w-3/5 text-center">Producto</th>
                      <th className="w-1/">Cantidad</th>
                      <th className="w-2/5 ">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {mezcalRows.map((mezcal) => (
                      <RowMezcal mezcal={mezcal} key={mezcal.id} />
                    ))}
                  </tbody>
                  <hr className="h-[2px] my-4 bg-data-cherry-500 border-0 rounded-3xl" />
                  <tfoot className="text-center">
                    <tr className="">
                      <th>Subtotal</th>
                      <th></th>
                      <th></th>
                      <td>
                        $
                        {subtotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                    <tr className="">
                      <th>Envío*</th>
                      <th></th>
                      <th></th>
                      <td className="">
                        <div className="py-2">
                          <input
                            type="radio"
                            id="mexicoShipping"
                            name="shippingMethod"
                            value="1"
                            onChange={(e) => setTipoEnvio(e.target.value)}
                            required
                          />
                          <label htmlFor="mexicoShipping">
                            Envío (Todo Mexico) $
                            {shippingCost.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </label>
                        </div>
                        <div className="">
                          <input
                            type="radio"
                            id="moreliaShipping"
                            name="shippingMethod"
                            value="2"
                            onChange={(e) => setTipoEnvio(e.target.value)}
                          />
                          <label htmlFor="moreliaShipping">
                            Recoger en tienda (Morelia Mich.)
                          </label>
                        </div>
                        {formErrors.tipoEnvio && <span className="text-red-500 text-sm block">{formErrors.tipoEnvio}</span>}
                      </td>
                    </tr>
                    <hr className="h-[2px] w-full my-4 bg-data-cherry-500 border-0 rounded-3xl" />
                    <tr>
                      <th>TOTAL</th>
                      <td></td>
                      <td></td>
                      <td>
                        $
                        {total.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <h1>DETALLES DEL PAGO</h1>
            <div className="bg-gradient-to-t from-data-cherry-900/5 to-data-cherry-900/40 p-10 rounded-3xl text-white h-max border border-[#4E002B]/100">
              <h1>Método de pago*</h1>
              <div>
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
              <div className="">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="creditCard">Tarjeta de crédito</label>
              </div>
              {formErrors.paymentMethod && <span className="text-red-500 text-sm block">{formErrors.paymentMethod}</span>}

              {paymentMethod === 'paypal' && (
                <div>
                  <a
                    className="bg-[#FFC224] w-full text-white h-10 xl:h-14 rounded-xl flex justify-center items-center my-8"
                    href="#"
                  >
                    <div className="font-roboto font-semibold text-xl  w-full h-full ">
                      <div className="relative h-full w-full items-center">
                        <Image
                          src="/Images/PayPal.svg"
                          layout="fill"
                          objectFit="fill"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              )}
              {paymentMethod === 'creditCard' && (
                <div className="flex flex-col px-4 py-2 ">
                  <label htmlFor="cardNumber">Número de tarjeta</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Número de tarjeta"
                    className="bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200 "
                  />
                  <div className="flex">
                    <div className="w-1/2 flex flex-col py-2 pr-2">
                      <label htmlFor="cardDate">Fecha de caducidad</label>
                      <input
                        type="text"
                        id="cardDate"
                        name="cardDate"
                        placeholder="01/01"
                        className="bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200"
                      />
                    </div>
                    <div className="w-1/2 flex flex-col py-2 pl-2">
                      <label htmlFor="cardCvc">CVC</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="CVC"
                        className="bg-[#790344]/25 bg-opacity-50 rounded-xl p-2 text-gray-300 placeholder:text-data-pink-200"
                      />
                    </div>
                  </div>
                  <p className="text-center">
                    Tus datos personales se utilizarán para procesar tu pedido,
                    mejorar tu experiencia en esta web y otros propósitos
                    descritos en nuestra 
                    <span className="text-[#EF0F4B]">
                      política de privacidad
                    </span>
                    .
                  </p>
                </div>
              )}
              <button
                type="submit"
                className="bg-[#7F0147] hover:bg-[#551538] rounded-md p-2 flex justify-center  w-full items-center  py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Finalizar la compra'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default FinalizarCompra