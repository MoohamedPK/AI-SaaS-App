/*
  Warnings:

  - Made the column `authorId` on table `Companion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Companion" DROP CONSTRAINT "Companion_authorId_fkey";

-- AlterTable
ALTER TABLE "Companion" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Companion" ADD CONSTRAINT "Companion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
