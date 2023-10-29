/*
  Warnings:

  - You are about to drop the column `gameSessionId` on the `Rule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_gameSessionId_fkey";

-- DropIndex
DROP INDEX "Rule_gameSessionId_key";

-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "ruleId" TEXT;

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "gameSessionId";

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
