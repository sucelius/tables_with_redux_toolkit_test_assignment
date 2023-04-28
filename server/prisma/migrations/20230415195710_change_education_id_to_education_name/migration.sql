/*
  Warnings:

  - You are about to drop the column `educationId` on the `User` table. All the data in the column will be lost.
  - Added the required column `educationName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_educationId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "educationId",
ADD COLUMN     "educationName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_educationName_fkey" FOREIGN KEY ("educationName") REFERENCES "Education"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
