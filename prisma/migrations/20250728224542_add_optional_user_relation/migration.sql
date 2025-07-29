-- AlterTable
ALTER TABLE "Companion" ADD COLUMN     "authorId" TEXT;

-- AddForeignKey
ALTER TABLE "Companion" ADD CONSTRAINT "Companion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
