///Cambie el prismaGloba, segun yo no hay pedo y funciona igual

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma



{/*const { PrismaClient } = require('@prisma/client')

const prismaClientSingleton = () => {
  return new PrismaClient()
}

if (!global.prismaGlobal) {
  global.prismaGlobal = prismaClientSingleton()
}

module.exports = global.prismaGlobal

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = module.exports
}
*/}