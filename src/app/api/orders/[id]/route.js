import prisma from '@/app/lib/prisma'
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const pedidoParam = searchParams.get('idPedido')
  const pedido = pedidoParam ? parseInt(pedidoParam) : null
  let productosPedido = []

  if (pedido !== null && !isNaN(pedido) && pedido > 0) {
    productosPedido = await prisma.pedido.findUnique({
      where: {
        id: pedido,
      },
      include: {
        renglonPedido: {
          select: {
            mezcal: true,
            cantidad: true,
          },
        },
      },
    })

    return Response.json({ data: productosPedido })
  }

  return Response(JSON.stringify({ error: 'Internal server error' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 500,
  })
}
