/*
  Warnings:

  - Added the required column `colour` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mood` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `negative` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "colour" TEXT NOT NULL,
ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "negative" BOOLEAN NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;
