-- CreateTable
CREATE TABLE `agregados` (
    `agregadoId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `descricao` TEXT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `agregadoId_UNIQUE`(`agregadoId`),
    PRIMARY KEY (`agregadoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ambientes` (
    `ambienteId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `descricao` TEXT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `projetos_projetoId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `ambienteId_UNIQUE`(`ambienteId`),
    INDEX `fk_ambientes_projetos1_idx`(`projetos_projetoId`),
    PRIMARY KEY (`ambienteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `clienteId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(256) NOT NULL,
    `descricao` TEXT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `clienteId_UNIQUE`(`clienteId`),
    PRIMARY KEY (`clienteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estrategias` (
    `estrategiaId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NOT NULL,
    `descricao` TEXT NULL,
    `parametros` LONGTEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `funcionalidades_funcionalidadeId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `estrategiaId_UNIQUE`(`estrategiaId`),
    INDEX `fk_estrategias_funcionalidades1_idx`(`funcionalidades_funcionalidadeId`),
    PRIMARY KEY (`estrategiaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estrategias_has_agregados` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `estrategias_estrategiaId` INTEGER UNSIGNED NOT NULL,
    `agregados_agregadoId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_estrategias_has_agregados_agregados1_idx`(`agregados_agregadoId`),
    INDEX `fk_estrategias_has_agregados_estrategias_idx`(`estrategias_estrategiaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionalidades` (
    `funcionalidadeId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `descricao` TEXT NULL,
    `tipo` VARCHAR(45) NULL,
    `ativada` TINYINT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `funcionalidadeId_UNIQUE`(`funcionalidadeId`),
    PRIMARY KEY (`funcionalidadeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionalidades_has_projetos_and_ambientes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `funcionalidades_funcionalidadeId` INTEGER UNSIGNED NOT NULL,
    `projetos_projetoId` INTEGER UNSIGNED NOT NULL,
    `ambientes_ambienteId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_funcionalidades_has_projetos_and_ambientes_ambientes1_idx`(`ambientes_ambienteId`),
    INDEX `fk_funcionalidades_has_projetos_and_ambientes_funcionalidad_idx`(`funcionalidades_funcionalidadeId`),
    INDEX `fk_funcionalidades_has_projetos_and_ambientes_projetos1_idx`(`projetos_projetoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projetos` (
    `projetoId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `clientes_clienteId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `projetoId_UNIQUE`(`projetoId`),
    INDEX `fk_projetos_clientes1_idx`(`clientes_clienteId`),
    PRIMARY KEY (`projetoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regras` (
    `regraId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `parametros` LONGTEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `agregados_agregadoId` INTEGER UNSIGNED NULL,
    `estrategias_estrategiaId` INTEGER UNSIGNED NULL,

    UNIQUE INDEX `regraId_UNIQUE`(`regraId`),
    INDEX `fk_regras_agregados1_idx`(`agregados_agregadoId`),
    INDEX `fk_regras_estrategias1_idx`(`estrategias_estrategiaId`),
    PRIMARY KEY (`regraId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `usuarioId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(256) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `usuario` VARCHAR(45) NOT NULL,
    `tipo` ENUM('Administrador', 'Usuario') NOT NULL,
    `senha` VARCHAR(256) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `clientes_clienteId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `usuarioId_UNIQUE`(`usuarioId`),
    INDEX `fk_usuarios_clientes1_idx`(`clientes_clienteId`),
    PRIMARY KEY (`usuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ambientes` ADD CONSTRAINT `fk_ambientes_projetos1` FOREIGN KEY (`projetos_projetoId`) REFERENCES `projetos`(`projetoId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estrategias` ADD CONSTRAINT `fk_estrategias_funcionalidades1` FOREIGN KEY (`funcionalidades_funcionalidadeId`) REFERENCES `funcionalidades`(`funcionalidadeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estrategias_has_agregados` ADD CONSTRAINT `fk_estrategias_has_agregados_agregados1` FOREIGN KEY (`agregados_agregadoId`) REFERENCES `agregados`(`agregadoId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estrategias_has_agregados` ADD CONSTRAINT `fk_estrategias_has_agregados_estrategias` FOREIGN KEY (`estrategias_estrategiaId`) REFERENCES `estrategias`(`estrategiaId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionalidades_has_projetos_and_ambientes` ADD CONSTRAINT `fk_funcionalidades_has_projetos_and_ambientes_ambientes1` FOREIGN KEY (`ambientes_ambienteId`) REFERENCES `ambientes`(`ambienteId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionalidades_has_projetos_and_ambientes` ADD CONSTRAINT `fk_funcionalidades_has_projetos_and_ambientes_funcionalidades1` FOREIGN KEY (`funcionalidades_funcionalidadeId`) REFERENCES `funcionalidades`(`funcionalidadeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionalidades_has_projetos_and_ambientes` ADD CONSTRAINT `fk_funcionalidades_has_projetos_and_ambientes_projetos1` FOREIGN KEY (`projetos_projetoId`) REFERENCES `projetos`(`projetoId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projetos` ADD CONSTRAINT `fk_projetos_clientes1` FOREIGN KEY (`clientes_clienteId`) REFERENCES `clientes`(`clienteId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `regras` ADD CONSTRAINT `fk_regras_agregados1` FOREIGN KEY (`agregados_agregadoId`) REFERENCES `agregados`(`agregadoId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `regras` ADD CONSTRAINT `fk_regras_estrategias1` FOREIGN KEY (`estrategias_estrategiaId`) REFERENCES `estrategias`(`estrategiaId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `fk_usuarios_clientes1` FOREIGN KEY (`clientes_clienteId`) REFERENCES `clientes`(`clienteId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
