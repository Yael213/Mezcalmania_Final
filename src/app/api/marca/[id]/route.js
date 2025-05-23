import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'


export async function GET(request, { params }){
  try {
    const Marca = await prisma.Marca.findUnique({
      where: { id: parseInt(params.id) }
    });
    return NextResponse.json(Marca);
    
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({message: error.message,}, { status: 500,});
    };
    
  }
}
