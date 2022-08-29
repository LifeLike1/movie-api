/*
  Warnings:

  - You are about to alter the column `title` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `description` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `firstName` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `lastName` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `nationality` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(56)`.
  - A unique constraint covering the columns `[title]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "nationality" SET DATA TYPE VARCHAR(56);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");
