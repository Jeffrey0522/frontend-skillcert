/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MarketplaceTransaction" DROP CONSTRAINT "MarketplaceTransaction_buyerId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "Id" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Wallet" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- AddForeignKey
ALTER TABLE "MarketplaceTransaction" ADD CONSTRAINT "MarketplaceTransaction_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
