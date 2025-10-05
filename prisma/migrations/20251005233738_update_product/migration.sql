/*
  Warnings:

  - Added the required column `favorite` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isNew` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "favorite" BOOLEAN NOT NULL,
ADD COLUMN     "isNew" BOOLEAN NOT NULL,
ADD COLUMN     "oldPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;
