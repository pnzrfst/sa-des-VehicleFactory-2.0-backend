/*
  Warnings:

  - You are about to drop the column `approved` on the `production` table. All the data in the column will be lost.
  - Added the required column `status` to the `quality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "production" DROP COLUMN "approved";

-- AlterTable
ALTER TABLE "quality" ADD COLUMN     "status" "Situation" NOT NULL;
