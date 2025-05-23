'use client'
import { useState, useEffect } from 'react'

export default function DetallePedido({ params }) {
  const [pedido, setPedido] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPedido = async () => {
      try {
        const response = await fetch('/api/orders/id?idPedido=' + params.id)
        const data = await response.json()
        setPedido(data.data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    getPedido()
  }, [params.id])

  if (loading) {
    return null
  }

  return (
    <div className="bg-deep-violet min h-full text-productos-violet text-3xl font-bold font-roboto p-10 px-24">
      <h1 className="text-data-yellow-200 pb-8">Compra finalizada</h1>
      <h2 className="text-2xl text-data-pink-200 pt-4 font-semibold">
        Muchas gracias por tu preferencia. Tu pedido ha sido recibido
      </h2>
      <div className="flex md:flex-row flex-col justify-between py-10 text-white font-normal text-xl">
        <div>
          <h1>Número del pedido</h1>
          <p>{pedido.id}</p>
        </div>
        <div>
          <h1>Fecha</h1>
          <p>{pedido.fecha}</p>
        </div>
        <div>
          <h1>Total</h1>
          <p>
            $
            {pedido.total !== undefined
              ? pedido.total.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : 'N/A'}
          </p>
        </div>
        <div>
          <h1>Método de pago</h1>
          <p>Transferencia bancaria directa</p>
        </div>
      </div>
      <div className="text-white font-normal text-xl pt-10">
        <h1 className="text-data-yellow-300 font-bold text-2xl">
          Nuestros detalles bancarios
        </h1>
        <div>
          <h1 className="text-data-yellow-200 font-bold pt-5">
            Productos Michoacanos de Calidad S. de R.L de C.V:
          </h1>
          <div className="flex justify-start ">
            <div className="w-1/12 mr-20">
              <h1 className="text-md font-light">Banco</h1>
              <p className="font-bold">Banamex</p>
            </div>
            <div>
              <h1 className="text-md font-light">Número de cuenta</h1>
              <p className="font-bold">
                Sucursal: 7012 Cuenta: 3570152 Clabe: 0024 7070 1235 7015 22
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-data-yellow-200 font-bold pt-5">
            Productos Michoacanos de Calidad S. de R.L de C.V:
          </h1>
          <div className="flex justify-start ">
            <div className="w-1/12 mr-20">
              <h1 className="text-md font-light">Banco</h1>
              <p className="font-bold">Oxxo</p>
            </div>
            <div>
              <h1 className="text-md font-light">Número de cuenta</h1>
              <p className="font-bold">Tarjeta: 5204 1648 9848 6490</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-white font-normal pt-10">
        <h1 className="font-bold">Detalles del pedido</h1>
        <table className="table-fixed border-separate  border-2 w-full text-xl">
          <thead className="border">
            <tr>
              <th>Producto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {pedido.renglonPedido.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.mezcal.nombre} x {item.cantidad}
                </td>
                <td>
                  $
                  {(item.cantidad * item.mezcal.precio).toLocaleString(
                    'en-US',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td>Subtotal</td>
              <td>
                $
                {pedido.total !== undefined
                  ? pedido.total.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : 'N/A'}
              </td>
            </tr>
            <tr>
              <td>Envío</td>
              <td>
                {pedido.tipoEnvio === 1
                  ? 'Todo México'
                  : 'Recoger en tienda (Morelia)'}
              </td>
            </tr>
            <tr>
              <td>Método de pago</td>
              <td>Transferencia bancaria directa</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>
                $
                {pedido.total !== undefined
                  ? pedido.total.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : 'N/A'}
              </td>
            </tr>
            <tr>
              <td>Nota</td>
              <td>{pedido.notas}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
