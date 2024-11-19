-- CreateTable
CREATE TABLE `UserAttachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `attachmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAttachment` ADD CONSTRAINT `UserAttachment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAttachment` ADD CONSTRAINT `UserAttachment_attachmentId_fkey` FOREIGN KEY (`attachmentId`) REFERENCES `Attachment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
