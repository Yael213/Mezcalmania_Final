-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mezcal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
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
    "marcaId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Mezcal_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mezcal" ("activo", "agave", "cantidad", "clase", "cocimiento", "destilacion", "fermentacion", "id", "imagen", "marcaId", "molienda", "municipio", "nombre", "poblado", "precio", "presentacion", "riquezaAlcoholica") SELECT "activo", "agave", "cantidad", "clase", "cocimiento", "destilacion", "fermentacion", "id", "imagen", "marcaId", "molienda", "municipio", "nombre", "poblado", "precio", "presentacion", "riquezaAlcoholica" FROM "Mezcal";
DROP TABLE "Mezcal";
ALTER TABLE "new_Mezcal" RENAME TO "Mezcal";
PRAGMA foreign_key_check("Mezcal");
PRAGMA foreign_keys=ON;
