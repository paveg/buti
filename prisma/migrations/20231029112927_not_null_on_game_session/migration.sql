/*
  Warnings:

  - Made the column `ruleId` on table `GameSession` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_ruleId_fkey";

-- AlterTable
ALTER TABLE "GameSession" ALTER COLUMN "ruleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
