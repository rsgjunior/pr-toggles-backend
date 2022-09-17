-- DropForeignKey
ALTER TABLE `ambiente` DROP FOREIGN KEY `fk_ambientes_projetos1`;

-- DropForeignKey
ALTER TABLE `estrategia` DROP FOREIGN KEY `fk_estrategias_funcionalidades1`;

-- DropForeignKey
ALTER TABLE `estrategia_has_agregado` DROP FOREIGN KEY `fk_estrategias_has_agregados_agregados1`;

-- DropForeignKey
ALTER TABLE `estrategia_has_agregado` DROP FOREIGN KEY `fk_estrategias_has_agregados_estrategias`;

-- DropForeignKey
ALTER TABLE `funcionalidade_has_projeto_and_ambiente` DROP FOREIGN KEY `fk_funcionalidades_has_projetos_and_ambientes_ambientes1`;

-- DropForeignKey
ALTER TABLE `funcionalidade_has_projeto_and_ambiente` DROP FOREIGN KEY `fk_funcionalidades_has_projetos_and_ambientes_funcionalidades1`;

-- DropForeignKey
ALTER TABLE `funcionalidade_has_projeto_and_ambiente` DROP FOREIGN KEY `fk_funcionalidades_has_projetos_and_ambientes_projetos1`;

-- DropForeignKey
ALTER TABLE `projeto` DROP FOREIGN KEY `fk_projetos_clientes1`;

-- DropForeignKey
ALTER TABLE `regra` DROP FOREIGN KEY `fk_regras_agregados1`;

-- DropForeignKey
ALTER TABLE `regra` DROP FOREIGN KEY `fk_regras_estrategias1`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `fk_usuarios_clientes1`;

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
