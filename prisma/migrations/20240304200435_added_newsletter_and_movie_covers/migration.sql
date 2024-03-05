-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "director" TEXT NOT NULL,
    "written_by" TEXT DEFAULT '',
    "duration" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "released_year" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "staff" JSONB NOT NULL,
    "coproduced_by" TEXT DEFAULT '',
    "sponsor" TEXT DEFAULT '',
    "diffusion" JSONB NOT NULL,
    "festivals" TEXT DEFAULT '',
    "press" JSONB NOT NULL,
    "spoiler" TEXT DEFAULT '',
    "cover" TEXT NOT NULL,
    "pictures" JSONB NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_slug_key" ON "movies"("slug");
