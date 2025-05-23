-- CreateTable
CREATE TABLE "Asociada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "comunidad" TEXT NOT NULL,
    "biografia" TEXT NOT NULL,
    "imagen" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "asociadaId" INTEGER NOT NULL,
    CONSTRAINT "Marca_asociadaId_fkey" FOREIGN KEY ("asociadaId") REFERENCES "Asociada" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mezcal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "cantidad" TEXT NOT NULL,
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
    CONSTRAINT "Mezcal_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RenglonPedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cantidad" INTEGER NOT NULL,
    "precio" REAL NOT NULL,
    "mezcalId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    CONSTRAINT "RenglonPedido_mezcalId_fkey" FOREIGN KEY ("mezcalId") REFERENCES "Mezcal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RenglonPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calle" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "colonia" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Direccion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
