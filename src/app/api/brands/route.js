import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(){
  try {
    const marcas = await prisma.Marca.findMany();
    return NextResponse.json(marcas);
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
    
  }
}

export async function POST(request) {
  try {
    const { nombre, descripcion, activa, imagen, facebook, instragram, web } = await request.json();

    const newMarca = await prisma.Marca.create({
      data: {
        nombre,
        descripcion,
        activa,
        imagen,
        facebook,
        instragram,
        web
      },
    });
    return NextResponse.json(newMarca);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request) {
  try {
    const { id, nombre, descripcion, activa, imagen, facebook, instagram, web } = await request.json();

    const updateMarca = await prisma.Marca.update({
      where:{
        id
      },
      data: {
        nombre,
        descripcion,
        activa,
        imagen,
        facebook,
        instagram,
        web
      },
    });
    return NextResponse.json(updateMarca);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}