-- CreateTable
CREATE TABLE "maintenance" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idProduction" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_idProduction_fkey" FOREIGN KEY ("idProduction") REFERENCES "production"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
