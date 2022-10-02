-- CreateTable
CREATE TABLE `agregado` (
    `agregado_id` INTEGER NOT NULL AUTO_INCREMENT,
    `projeto_id` INTEGER NULL,
    `nome` VARCHAR(45) NOT NULL,
    `descricao` TEXT NULL,
    `regras` LONGTEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_agregado_projeto1_idx`(`projeto_id`),
    PRIMARY KEY (`agregado_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `cliente_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(256) NOT NULL,
    `descricao` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`cliente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estrategia` (
    `estrategia_id` INTEGER NOT NULL AUTO_INCREMENT,
    `funcionalidade_id` INTEGER NOT NULL,
    `ambiente` ENUM('prod', 'homolog', 'dev') NOT NULL,
    `valor` TEXT NULL,
    `variacoes` LONGTEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_estrategias_funcionalidades1_idx`(`funcionalidade_id`),
    PRIMARY KEY (`estrategia_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estrategia_has_agregado` (
    `estrategia_has_agregado_id` INTEGER NOT NULL AUTO_INCREMENT,
    `estrategia_id` INTEGER NOT NULL,
    `agregado_id` INTEGER NOT NULL,
    `ativado` BOOLEAN NOT NULL DEFAULT false,
    `valor` TEXT NULL,
    `variacoes` LONGTEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_estrategias_has_agregados_agregados1_idx`(`agregado_id`),
    INDEX `fk_estrategias_has_agregados_estrategias_idx`(`estrategia_id`),
    PRIMARY KEY (`estrategia_has_agregado_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionalidade` (
    `funcionalidade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `projeto_id` INTEGER NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `descricao` TEXT NULL,
    `ativada_prod` BOOLEAN NOT NULL DEFAULT false,
    `ativada_homolog` BOOLEAN NOT NULL DEFAULT false,
    `ativada_dev` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_funcionalidade_projeto1_idx`(`projeto_id`),
    PRIMARY KEY (`funcionalidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projeto` (
    `projeto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_projetos_clientes1_idx`(`cliente_id`),
    PRIMARY KEY (`projeto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `usuario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` INTEGER NOT NULL,
    `nome` VARCHAR(256) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `tipo` ENUM('Administrador', 'Usuario') NOT NULL,
    `senha` VARCHAR(256) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_usuarios_clientes1_idx`(`cliente_id`),
    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agregado` ADD CONSTRAINT `fk_agregado_projeto1` FOREIGN KEY (`projeto_id`) REFERENCES `projeto`(`projeto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estrategia` ADD CONSTRAINT `fk_estrategias_funcionalidades1` FOREIGN KEY (`funcionalidade_id`) REFERENCES `funcionalidade`(`funcionalidade_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estrategia_has_agregado` ADD CONSTRAINT `fk_estrategias_has_agregados_agregados1` FOREIGN KEY (`agregado_id`) REFERENCES `agregado`(`agregado_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estrategia_has_agregado` ADD CONSTRAINT `fk_estrategias_has_agregados_estrategias` FOREIGN KEY (`estrategia_id`) REFERENCES `estrategia`(`estrategia_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionalidade` ADD CONSTRAINT `fk_funcionalidade_projeto1` FOREIGN KEY (`projeto_id`) REFERENCES `projeto`(`projeto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projeto` ADD CONSTRAINT `fk_projetos_clientes1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`cliente_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_usuario_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`cliente_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
