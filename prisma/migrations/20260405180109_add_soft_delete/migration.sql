/*
  Warnings:

  - A unique constraint covering the columns `[nombre_proyecto]` on the table `proyecto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "proyecto_nombre_proyecto_key" ON "proyecto"("nombre_proyecto");
