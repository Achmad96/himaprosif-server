/*
  Warnings:

  - You are about to drop the column `adminId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_adminId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "adminId";

-- CreateTable
CREATE TABLE "PostOwnAdmin" (
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostOwnAdmin_pkey" PRIMARY KEY ("postId","authorId")
);

-- CreateIndex
CREATE INDEX "PostOwnAdmin_postId_idx" ON "PostOwnAdmin"("postId");

-- AddForeignKey
ALTER TABLE "PostOwnAdmin" ADD CONSTRAINT "PostOwnAdmin_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOwnAdmin" ADD CONSTRAINT "PostOwnAdmin_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
