// src/app/api/products/route.js
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const quantityParam = searchParams.get('quantity')
  const quantity = quantityParam ? parseInt(quantityParam) : null
  let products = []

  if (quantity !== null && !isNaN(quantity) && quantity > 0) {
    products = await prisma.mezcal.findMany({
      take: quantity,
    })
  } else {
    products = await prisma.mezcal.findMany()
  }

  return Response.json({ data: products })
}

export async function POST(req, res) {
  const {
    activo,
    nombre,
    precio,
    cantidad,
    clase,
    poblado,
    municipio,
    agave,
    cocimiento,
    molienda,
    fermentacion,
    destilacion,
    presentacion,
    riquezaAlcoholica,
    imagen,
    marcaId,
  } = await req.json() // Obtener los datos del cuerpo de la solicitud

  try {
    const newMezcal = await prisma.mezcal.create({
      data: {
        activo,
        nombre,
        precio,
        cantidad,
        clase,
        poblado,
        municipio,
        agave,
        cocimiento,
        molienda,
        fermentacion,
        destilacion,
        presentacion,
        riquezaAlcoholica,
        imagen,
        marcaId,
      },
    })

    return new Response(JSON.stringify(newMezcal), { status: 201 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error creating mezcal: ' + error.message }),
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(request, { params }) {
  try {
    const {
      id,
      activo,
      nombre,
      precio,
      cantidad,
      clase,
      poblado,
      municipio,
      agave,
      cocimiento,
      molienda,
      fermentacion,
      destilacion,
      presentacion,
      riquezaAlcoholica,
      imagen,
      marcaId,
    } = await request.json()

    const updateMezcal = await prisma.Mezcal.update({
      where:{
        id
      },
      data: {
        activo,
        nombre,
        precio,
        cantidad,
        clase,
        poblado,
        municipio,
        agave,
        cocimiento,
        molienda,
        fermentacion,
        destilacion,
        presentacion,
        riquezaAlcoholica,
        imagen,
        marcaId,
      },
    });

    return NextResponse.json(updateMezcal);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
