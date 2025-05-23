import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const asociadas = await prisma.asociada.findMany();
    return NextResponse.json(asociadas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request) {
  try {
    const { nombre, puesto, alta, numero, correo, facebook, instragram, bio, imagen } = await request.json();

    const newAsociada = await prisma.asociada.create({
      data: {
        nombre,
        puesto,
        alta,
        numero,
        correo,
        facebook,
        instragram,
        biografia: bio,
        imagen,
      },
    });

    return NextResponse.json(newAsociada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request, { params }) {
  try {
    const { id, nombre, puesto, alta, numero, correo, facebook, instragram, bio, imagen } = await request.json();

    const updateAsociada = await prisma.asociada.update({
      where:{
        id
      },
      data: {
        nombre,
        puesto,
        alta,
        numero,
        correo,
        facebook,
        instragram,
        biografia: bio,
        imagen,
      },
    });

    return NextResponse.json(updateAsociada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
