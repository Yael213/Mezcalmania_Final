/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Pedido` table. All the data in the column will be lost.
  - Added the required column `apellidoMaterno` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellidoPaterno` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ciudad` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoPostal` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correoElectronico` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreEmpresa` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notas` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoEnvio` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "total" REAL NOT NULL,
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
    "notas" TEXT NOT NULL
);
INSERT INTO "new_Pedido" ("fecha", "id", "total") SELECT "fecha", "id", "total" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
PRAGMA foreign_key_check("Pedido");
PRAGMA foreign_keys=ON;
