import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

BigInt.prototype.toJSON = function () {
  return this.toString()
}

export async function GET() {
  const products =
    await prisma.$queryRaw`SELECT m.*, rp."mezcalId", SUM(rp."cantidad") AS totalCantidad 
    FROM "RenglonPedido" rp INNER JOIN "Mezcal" m ON rp."mezcalId" = m."id" 
    GROUP BY rp."mezcalId", m."id" ORDER BY totalCantidad DESC
    LIMIT 5`

  return NextResponse.json(products)
}
