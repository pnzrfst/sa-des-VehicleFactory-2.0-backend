/*
  Warnings:

  - You are about to drop the column `updateAt` on the `maintenance` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `maintenance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maintenance" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
