/*
  Warnings:

  - A unique constraint covering the columns `[idProduction]` on the table `quality` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quality_idProduction_key" ON "quality"("idProduction");
