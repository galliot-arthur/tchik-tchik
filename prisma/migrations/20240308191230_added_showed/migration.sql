-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "cover" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "coverId" TEXT;

-- CreateTable
CREATE TABLE "showed" (
    "id" TEXT NOT NULL,
    "showedId" TEXT NOT NULL,

    CONSTRAINT "showed_pkey" PRIMARY KEY ("id")
);
