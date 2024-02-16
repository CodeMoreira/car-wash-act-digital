-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'FINISHED', 'CANCELED');

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'PENDING';
