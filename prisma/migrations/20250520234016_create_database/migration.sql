-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "unity" TEXT NOT NULL,
    "stock" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production" (
    "id" TEXT NOT NULL,
    "vehicleProduced" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_production" (
    "id" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "idProduction" TEXT NOT NULL,

    CONSTRAINT "product_production_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_code_key" ON "product"("code");

-- AddForeignKey
ALTER TABLE "product_production" ADD CONSTRAINT "product_production_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_production" ADD CONSTRAINT "product_production_idProduction_fkey" FOREIGN KEY ("idProduction") REFERENCES "production"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
