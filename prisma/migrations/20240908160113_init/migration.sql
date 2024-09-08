-- CreateEnum
CREATE TYPE "Crop" AS ENUM ('SOY', 'CORN', 'COTTON', 'COFFEE', 'SUGARCANE');

-- CreateTable
CREATE TABLE "farmers" (
    "id" SERIAL NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" INTEGER NOT NULL,
    "arableTotalArea" INTEGER NOT NULL,
    "vegetationArea" INTEGER NOT NULL,
    "crops" "Crop"[],

    CONSTRAINT "farmers_pkey" PRIMARY KEY ("id")
);
