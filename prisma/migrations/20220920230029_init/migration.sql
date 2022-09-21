-- CreateTable
CREATE TABLE `agregado` (
    `agregado_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `descricao` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`agregado_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ambiente` (
    `ambiente_id` INTEGER NOT NULL AUTO_INCREMENT,
    `projeto_id` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `descricao` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_ambientes_projetos1_idx`(`projeto_id`),
    PRIMARY KEY (`ambiente_id`)
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
    `tipo` VARCHAR(45) NOT NULL,
    `descricao` TEXT NULL,
    `parametros` LONGTEXT NOT NULL,
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

    INDEX `fk_estrategias_has_agregados_agregados1_idx`(`agregado_id`),
    INDEX `fk_estrategias_has_agregados_estrategias_idx`(`estrategia_id`),
    PRIMARY KEY (`estrategia_has_agregado_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionalidade` (
    `funcionalidade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `descricao` TEXT NULL,
    `tipo` VARCHAR(45) NULL,
    `ativada` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`funcionalidade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionalidade_has_projeto_and_ambiente` (
    `funcionalidade_has_projeto_and_ambiente_id` INTEGER NOT NULL AUTO_INCREMENT,
    `funcionalidade_id` INTEGER NOT NULL,
    `projeto_id` INTEGER NOT NULL,
    `ambiente_id` INTEGER NOT NULL,
    `ativada` BOOLEAN NOT NULL DEFAULT false,

    INDEX `fk_funcionalidades_has_projetos_and_ambientes_ambientes1_idx`(`ambiente_id`),
    INDEX `fk_funcionalidades_has_projetos_and_ambientes_funcionalidad_idx`(`funcionalidade_id`),
    INDEX `fk_funcionalidades_has_projetos_and_ambientes_projetos1_idx`(`projeto_id`),
    PRIMARY KEY (`funcionalidade_has_projeto_and_ambiente_id`)
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
CREATE TABLE `regra` (
    `regra_id` INTEGER NOT NULL AUTO_INCREMENT,
    `agregado_id` INTEGER NULL,
    `estrategia_id` INTEGER NULL,
    `parametros` LONGTEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_regras_agregados1_idx`(`agregado_id`),
    INDEX `fk_regras_estrategias1_idx`(`estrategia_id`),
    PRIMARY KEY (`regra_id`)
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
ALTER TABLE `ambiente` ADD CONSTRAINT `fk_ambientes_projetos1` FOREIGN KEY (`projeto_id`) REFERENCES `projeto`(`projeto_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estrategia` ADD CONSTRAINT `fk_estrategias_funcionalidades1` FOREIGN KEY (`funcionalidade_id`) REFERENCES `funcionalidade`(`funcionalidade_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estrategia_has_agregado` ADD CONSTRAINT `fk_estrategias_has_agregados_agregados1` FOREIGN KEY (`agregado_id`) REFERENCES `agregado`(`agregado_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estrategia_has_agregado` ADD CONSTRAINT `fk_estrategias_has_agregados_estrategias` FOREIGN KEY (`estrategia_id`) REFERENCES `estrategia`(`estrategia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionalidade_has_projeto_and_ambiente` ADD CONSTRAINT `fk_funcionalidades_has_projetos_and_ambientes_ambientes1` FOREIGN KEY (`ambiente_id`) REFERENCES `ambiente`(`ambiente_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionalidade_has_projeto_and_ambiente` ADD CONSTRAINT `fk_funcionalidades_has_projetos_and_ambientes_funcionalidades1` FOREIGN KEY (`funcionalidade_id`) REFERENCES `funcionalidade`(`funcionalidade_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionalidade_has_projeto_and_ambiente` ADD CONSTRAINT `fk_funcionalidades_has_projetos_and_ambientes_projetos1` FOREIGN KEY (`projeto_id`) REFERENCES `projeto`(`projeto_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projeto` ADD CONSTRAINT `fk_projetos_clientes1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`cliente_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `regra` ADD CONSTRAINT `fk_regras_agregados1` FOREIGN KEY (`agregado_id`) REFERENCES `agregado`(`agregado_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `regra` ADD CONSTRAINT `fk_regras_estrategias1` FOREIGN KEY (`estrategia_id`) REFERENCES `estrategia`(`estrategia_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_usuarios_clientes1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`cliente_id`) ON DELETE CASCADE ON UPDATE CASCADE;
