import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const asociadas = await prisma.cliente.findMany();
    return NextResponse.json(asociadas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request) {
  try {
    const { nombre,
            apellido,
            email,
            password,
            telefono } = await request.json();

    const newAsociada = await prisma.cliente.create({
      data: {
        nombre,
        apellido,
        email,
        password,
        telefono
      },
    });

    return NextResponse.json(newAsociada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request) {
  try {
    const { id,
            nombre,
            apellido,
            email,
            password,
            telefono } = await request.json();

    const newAsociada = await prisma.cliente.create({
      where:{
        id
      },
      data: {
        nombre,
        apellido,
        email,
        password,
        telefono
      },
    });

    return NextResponse.json(newAsociada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}