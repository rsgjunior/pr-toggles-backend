-- CreateTable
CREATE TABLE `chave` (
    `chave_id` VARCHAR(512) NOT NULL,
    `projeto_id` INTEGER NOT NULL,
    `ambiente` ENUM('prod', 'homolog', 'dev') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_chave_projeto1_idx`(`projeto_id`),
    PRIMARY KEY (`chave_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chave` ADD CONSTRAINT `fk_chave_projeto1` FOREIGN KEY (`projeto_id`) REFERENCES `projeto`(`projeto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
