import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


//Obtener eventos
export async function GET() {
  try {
    const listaEventos = await prisma.EventosList.findMany();
    return NextResponse.json(listaEventos);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}


  //Crear nuevo evento
  export async function POST(request) {
    try {
      const { titulo, resumen, imagenPath } = await request.json();
      const nuevoEvento = await prisma.EventosList.create({
        data: {
          titulo,
          resumen,
          imagenPath,
        },
      });
      return NextResponse.json(nuevoEvento, { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }

  // Actualizar un evento
  export async function PUT(request) {
    try {
      const { id, titulo, resumen, imagenPath} = await request.json();
      const eventoActualizado = await prisma.EventosList.update({
        where: { id: parseInt(id) },
        data: {
          titulo,
          resumen,
          imagenPath,
        },
      });
      return NextResponse.json(eventoActualizado);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }


  //Borrar un evento
  export async function DELETE(request) {
    try {
      const { id } = await request.json();
      const eventoBorrado = await prisma.EventosList.delete({
        where: { id: parseInt(id) },
      });
      return NextResponse.json(eventoBorrado);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }