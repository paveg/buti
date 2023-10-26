/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,sequence]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_sessionId_sequence_key" ON "Game"("sessionId", "sequence");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
