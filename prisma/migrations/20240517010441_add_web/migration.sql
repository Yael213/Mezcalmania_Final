-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Marca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "facebook" TEXT NOT NULL DEFAULT '/',
    "instagram" TEXT NOT NULL DEFAULT '/',
    "web" TEXT NOT NULL DEFAULT '/',
    "asociadaId" INTEGER NOT NULL,
    CONSTRAINT "Marca_asociadaId_fkey" FOREIGN KEY ("asociadaId") REFERENCES "Asociada" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Marca" ("asociadaId", "descripcion", "facebook", "id", "imagen", "instagram", "nombre") SELECT "asociadaId", "descripcion", "facebook", "id", "imagen", "instagram", "nombre" FROM "Marca";
DROP TABLE "Marca";
ALTER TABLE "new_Marca" RENAME TO "Marca";
PRAGMA foreign_key_check("Marca");
PRAGMA foreign_keys=ON;
