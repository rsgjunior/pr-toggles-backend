/*
  Warnings:

  - Made the column `regras` on table `agregado` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `agregado` MODIFY `nome` VARCHAR(45) NULL,
    MODIFY `regras` JSON NOT NULL;
