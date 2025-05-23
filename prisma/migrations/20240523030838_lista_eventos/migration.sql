-- CreateTable
CREATE TABLE "EventosList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "imagenPath" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
