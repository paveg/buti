/*
  Warnings:

  - Made the column `date` on table `GameSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GameSession" ALTER COLUMN "date" SET NOT NULL;
