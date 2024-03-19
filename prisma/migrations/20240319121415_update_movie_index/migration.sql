-- DropIndex
DROP INDEX "movies_index_key";

-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "index" SET DEFAULT 0,
ALTER COLUMN "index" DROP DEFAULT;
DROP SEQUENCE "movies_index_seq";
