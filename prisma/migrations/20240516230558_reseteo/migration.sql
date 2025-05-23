/*
  Warnings:

  - You are about to drop the column `apellido` on the `Asociada` table. All the data in the column will be lost.
  - You are about to drop the column `comunidad` on the `Asociada` table. All the data in the column will be lost.
  - You are about to drop the column `fechaNacimiento` on the `Asociada` table. All the data in the column will be lost.
  - Added the required column `correo` to the `Asociada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `Asociada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instragram` to the `Asociada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Asociada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puesto` to the `Asociada` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asociada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instragram" TEXT NOT NULL,
    "biografia" TEXT NOT NULL,
    "imagen" TEXT NOT NULL
);
INSERT INTO "new_Asociada" ("biografia", "id", "imagen", "nombre") SELECT "biografia", "id", "imagen", "nombre" FROM "Asociada";
DROP TABLE "Asociada";
ALTER TABLE "new_Asociada" RENAME TO "Asociada";
PRAGMA foreign_key_check("Asociada");
PRAGMA foreign_keys=ON;
