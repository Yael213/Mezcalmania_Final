-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AsociadaMarca" (
    "asociadaId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,

    PRIMARY KEY ("asociadaId", "marcaId")
);
INSERT INTO "new_AsociadaMarca" ("asociadaId", "marcaId") SELECT "asociadaId", "marcaId" FROM "AsociadaMarca";
DROP TABLE "AsociadaMarca";
ALTER TABLE "new_AsociadaMarca" RENAME TO "AsociadaMarca";
CREATE TABLE "new_RenglonPedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cantidad" INTEGER NOT NULL,
    "precio" REAL NOT NULL,
    "mezcalId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL
);
INSERT INTO "new_RenglonPedido" ("cantidad", "id", "mezcalId", "pedidoId", "precio") SELECT "cantidad", "id", "mezcalId", "pedidoId", "precio" FROM "RenglonPedido";
DROP TABLE "RenglonPedido";
ALTER TABLE "new_RenglonPedido" RENAME TO "RenglonPedido";
CREATE TABLE "new_Direccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calle" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "colonia" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL
);
INSERT INTO "new_Direccion" ("calle", "clienteId", "colonia", "cp", "estado", "id", "municipio", "numero") SELECT "calle", "clienteId", "colonia", "cp", "estado", "id", "municipio", "numero" FROM "Direccion";
DROP TABLE "Direccion";
ALTER TABLE "new_Direccion" RENAME TO "Direccion";
CREATE TABLE "new_Mezcal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "nombre" TEXT NOT NULL,
    "precio" REAL NOT NULL,
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
    "marcaId" INTEGER NOT NULL
);
INSERT INTO "new_Mezcal" ("activo", "agave", "cantidad", "clase", "cocimiento", "destilacion", "fermentacion", "id", "imagen", "marcaId", "molienda", "municipio", "nombre", "poblado", "precio", "presentacion", "riquezaAlcoholica") SELECT "activo", "agave", "cantidad", "clase", "cocimiento", "destilacion", "fermentacion", "id", "imagen", "marcaId", "molienda", "municipio", "nombre", "poblado", "precio", "presentacion", "riquezaAlcoholica" FROM "Mezcal";
DROP TABLE "Mezcal";
ALTER TABLE "new_Mezcal" RENAME TO "Mezcal";
PRAGMA foreign_key_check("AsociadaMarca");
PRAGMA foreign_key_check("RenglonPedido");
PRAGMA foreign_key_check("Direccion");
PRAGMA foreign_key_check("Mezcal");
PRAGMA foreign_keys=ON;
