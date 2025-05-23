import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(){
  try {
    const Amarcas = await prisma.AsociadaMarca.findMany();
    return NextResponse.json(Amarcas);
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
    
  }
}

export async function POST(req, res) {
  const {
    asociadaId,
    marcaId
  } = await req.json() // Obtener los datos del cuerpo de la solicitud

  try {
    const newAMarca = await prisma.AsociadaMarca.create({
      data: {
        asociadaId,
        marcaId,
      },
    })

    return new Response(JSON.stringify(newAMarca), { status: 201 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error creating mezcal: ' + error.message }),
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(req, res){
  try {
    const { asociadaId, marcaId } = await req.json();

    const deleteRegistro = await prisma.asociadaMarca.delete({
      where: {
        asociadaId_marcaId: { // Esto asume que tienes un índice compuesto
          asociadaId: Number(asociadaId),
          marcaId: Number(marcaId),
        },
      },
    });

    return NextResponse.json(deleteRegistro);
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
  }
}