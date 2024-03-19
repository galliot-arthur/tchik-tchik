/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `movies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "index" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movies_index_key" ON "movies"("index");
