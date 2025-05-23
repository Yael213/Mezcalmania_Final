/*
  Warnings:

  - You are about to drop the column `asociadaId` on the `Marca` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AsociadaMarca" (
    "asociadaId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,

    PRIMARY KEY ("asociadaId", "marcaId"),
    CONSTRAINT "AsociadaMarca_asociadaId_fkey" FOREIGN KEY ("asociadaId") REFERENCES "Asociada" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AsociadaMarca_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Marca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "facebook" TEXT NOT NULL DEFAULT '/',
    "instagram" TEXT NOT NULL DEFAULT '/',
    "web" TEXT NOT NULL DEFAULT '/'
);
INSERT INTO "new_Marca" ("descripcion", "facebook", "id", "imagen", "instagram", "nombre", "web") SELECT "descripcion", "facebook", "id", "imagen", "instagram", "nombre", "web" FROM "Marca";
DROP TABLE "Marca";
ALTER TABLE "new_Marca" RENAME TO "Marca";
PRAGMA foreign_key_check("Marca");
PRAGMA foreign_keys=ON;
