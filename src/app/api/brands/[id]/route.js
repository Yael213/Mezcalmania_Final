import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'



export async function GET(request, { params }){
  try {
    const asociadaMarcas = await prisma.asociadaMarca.findMany({
      where: { asociadaId: parseInt(params.id) },
      include: { marca: true }
    });
    return NextResponse.json(asociadaMarcas);
    
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
    
  }
}

export async function DELETE(request, { params }){
  try {
    const deleteMarca = await prisma.Marca.delete({
      where: {
        id: Number(params.id),
      },
    })
    return NextResponse.json(deleteMarca);
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
  }
}