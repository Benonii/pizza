/*
  Warnings:

  - The `actions` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "actions",
ADD COLUMN     "actions" TEXT[];
