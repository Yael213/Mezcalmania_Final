-- CreateTable
CREATE TABLE "Asociada" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "alta" BOOLEAN NOT NULL DEFAULT true,
    "numero" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instragram" TEXT NOT NULL,
    "biografia" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Asociada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL DEFAULT 'none',
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "imagen" TEXT NOT NULL,
    "facebook" TEXT NOT NULL DEFAULT '/',
    "instagram" TEXT NOT NULL DEFAULT '/',
    "web" TEXT NOT NULL DEFAULT '/',

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsociadaMarca" (
    "asociadaId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,

    CONSTRAINT "AsociadaMarca_pkey" PRIMARY KEY ("asociadaId","marcaId")
);

-- CreateTable
CREATE TABLE "Mezcal" (
    "id" SERIAL NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "clase" TEXT NOT NULL,
    "poblado" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "agave" TEXT NOT NULL,
    "cocimiento" TEXT NOT NULL,
    "molienda" TEXT NOT NULL,
    "fermentacion" TEXT NOT NULL,
    "destilacion" TEXT NOT NULL,
    "presentacion" TEXT NOT NULL,
    "riquezaAlcoholica" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "marcaId" INTEGER NOT NULL,

    CONSTRAINT "Mezcal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "tipoEnvio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "nombreEmpresa" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "codigoPostal" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correoElectronico" TEXT NOT NULL,
    "notas" TEXT NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RenglonPedido" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "mezcalId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,

    CONSTRAINT "RenglonPedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Master" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "colonia" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventosList" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "imagenPath" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventosList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AsociadaMarca" ADD CONSTRAINT "AsociadaMarca_asociadaId_fkey" FOREIGN KEY ("asociadaId") REFERENCES "Asociada"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsociadaMarca" ADD CONSTRAINT "AsociadaMarca_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mezcal" ADD CONSTRAINT "Mezcal_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenglonPedido" ADD CONSTRAINT "RenglonPedido_mezcalId_fkey" FOREIGN KEY ("mezcalId") REFERENCES "Mezcal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenglonPedido" ADD CONSTRAINT "RenglonPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
