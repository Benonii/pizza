/*
  Warnings:

  - You are about to drop the column `pizza_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `RestaurantTopping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topping` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantId` to the `Pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_name` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pizza_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_pizza_id_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantTopping" DROP CONSTRAINT "RestaurantTopping_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantTopping" DROP CONSTRAINT "RestaurantTopping_topping_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "pizza_id";

-- AlterTable
ALTER TABLE "Pizza" ADD COLUMN     "restaurantId" INTEGER NOT NULL,
ADD COLUMN     "toppings" TEXT[];

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "admin_name" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "toppings" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "restaurantId" INTEGER;

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "restaurantId" INTEGER;

-- DropTable
DROP TABLE "RestaurantTopping";

-- DropTable
DROP TABLE "Topping";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pizza" ADD CONSTRAINT "Pizza_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
