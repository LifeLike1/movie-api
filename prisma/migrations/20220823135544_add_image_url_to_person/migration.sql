/*
  Warnings:

  - Added the required column `imageUrl` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "imageUrl" TEXT NOT NULL;
