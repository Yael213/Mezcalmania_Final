import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(request, { params }){
  try {
    const user = params.mail;
    const pedidosUsuario = await prisma.pedido.findMany({
      where: { correoElectronico: user },
      include: { renglonPedido: true }
    });
    return NextResponse.json(pedidosUsuario);
    
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
    
  }
}