/*
  Warnings:

  - You are about to drop the `_RolePermissions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actions` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_RolePermissions" DROP CONSTRAINT "_RolePermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "_RolePermissions" DROP CONSTRAINT "_RolePermissions_B_fkey";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "actions" TEXT NOT NULL;

-- DropTable
DROP TABLE "_RolePermissions";
