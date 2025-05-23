import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(request, { params }){
  try {
    const alta = params.alta === 'true'; // Asegurarse de que sea booleano
    const asociadas = await prisma.Asociada.findMany({
      where: { alta: alta }
    });
    return NextResponse.json(asociadas);
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
  }
}



export async function DELETE(request, { params }){
  try {
    const deleteAsociada = await prisma.asociada.delete({
      where: {
        id: Number(params.alta),
      },
    })
    return NextResponse.json(deleteAsociada);
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
  }
}