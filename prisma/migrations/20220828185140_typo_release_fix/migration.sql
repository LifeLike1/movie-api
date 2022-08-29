/*
  Warnings:

  - You are about to drop the column `realeaseDate` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `releaseDate` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "realeaseDate",
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;
