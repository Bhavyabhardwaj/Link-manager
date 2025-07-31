-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('BIO', 'SHORT');

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "customSlug" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "type" "LinkType" NOT NULL DEFAULT 'BIO',
ALTER COLUMN "order" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'light';

-- CreateIndex
CREATE INDEX "Link_slug_idx" ON "Link"("slug");

-- CreateIndex
CREATE INDEX "Link_userId_order_idx" ON "Link"("userId", "order");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_isPublic_idx" ON "User"("isPublic");

-- CreateIndex
CREATE INDEX "linkClick_country_idx" ON "linkClick"("country");

-- CreateIndex
CREATE INDEX "linkClick_device_idx" ON "linkClick"("device");
