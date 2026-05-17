/*
  Warnings:

  - A unique constraint covering the columns `[originalId]` on the table `Projeto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Projeto" ADD COLUMN     "analisadoPelaIA" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "linkOficial" TEXT,
ADD COLUMN     "originalId" TEXT,
ADD COLUMN     "periculosidade" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Projeto_originalId_key" ON "public"."Projeto"("originalId");
