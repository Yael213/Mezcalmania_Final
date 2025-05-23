-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asociada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "alta" TEXT NOT NULL DEFAULT '1',
    "numero" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instragram" TEXT NOT NULL,
    "biografia" TEXT NOT NULL,
    "imagen" TEXT NOT NULL
);
INSERT INTO "new_Asociada" ("alta", "biografia", "correo", "facebook", "id", "imagen", "instragram", "nombre", "numero", "puesto") SELECT "alta", "biografia", "correo", "facebook", "id", "imagen", "instragram", "nombre", "numero", "puesto" FROM "Asociada";
DROP TABLE "Asociada";
ALTER TABLE "new_Asociada" RENAME TO "Asociada";
PRAGMA foreign_key_check("Asociada");
PRAGMA foreign_keys=ON;
