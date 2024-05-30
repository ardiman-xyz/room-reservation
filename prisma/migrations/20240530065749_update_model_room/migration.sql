/*
  Warnings:

  - Added the required column `capacity` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilities` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Room` ADD COLUMN `capacity` INTEGER NOT NULL,
    ADD COLUMN `facilities` VARCHAR(191) NOT NULL;
