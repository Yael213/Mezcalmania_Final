-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Marca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT 'none',
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
