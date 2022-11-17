import { Injectable, Logger } from '@nestjs/common';
import { Variacao } from './interfaces';
import { MD5 } from 'crypto-js';
@Injectable()
export class VariacoesService {
  private readonly logger = new Logger(VariacoesService.name);

  calcularVariacao(
    valorPadrao: string,
    variacoes: Variacao[],
    contexto: object,
    salt: string,
  ) {
    this.logger.log('calcularVariacao');

    if (!('user_id' in contexto)) {
      this.logger.log(
        'Não existe a chave user_id no contexto informado. Vai retornar valor padrão',
      );
      return valorPadrao;
    }

    const resultadoHash = this.calcularHash(contexto['user_id'], salt);

    const variacoesNormalizado = this.normalizarVariacoes(
      valorPadrao,
      variacoes,
    );

    const variacaoSelecionada = variacoesNormalizado.find(
      (variacao) =>
        resultadoHash > variacao.range.inicio &&
        resultadoHash <= variacao.range.fim,
    );

    return variacaoSelecionada?.valor;
  }

  normalizarVariacoes(valorPadrao: string, variacoes: Variacao[]) {
    this.logger.log('normalizarVariacoes');

    // Calcula o peso total das variações
    const pesoTotalVariacoes = variacoes.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual.peso,
      0,
    );

    // Insere o valor padrão no objeto com o peso sendo o restante da porcentagem das variações
    variacoes.unshift({
      valor: valorPadrao,
      peso: 100 - pesoTotalVariacoes,
    });

    // Define os ranges baseado na porcentagem de cada variação
    let rangeAtual = 0;
    for (const i in variacoes) {
      const variacao = variacoes[i];

      variacao.range = {
        inicio: rangeAtual,
        fim: rangeAtual + variacao.peso / 100,
      };

      rangeAtual = variacao.range.fim;
    }

    return variacoes;
  }

  calcularHash(userId: string, salt: string) {
    this.logger.log('calculateHash', userId, salt);

    const seed = userId + salt;
    const hashedSeed = MD5(seed).toString();
    this.logger.log('hashedSeed', hashedSeed);
    const quarter = hashedSeed.substring(0, 8);

    return parseInt(quarter, 16) / 0xffffffff;
  }
}
