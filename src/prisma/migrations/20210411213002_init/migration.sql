-- CreateTable
CREATE TABLE "CryptocomparePrice" (
    "id" SERIAL NOT NULL,
    "fsym" VARCHAR(255) NOT NULL,
    "tsym" VARCHAR(255) NOT NULL,
    "raw" JSONB NOT NULL,
    "display" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
