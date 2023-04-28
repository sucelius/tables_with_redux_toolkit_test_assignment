-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_educationId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "educationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE SET NULL ON UPDATE CASCADE;
