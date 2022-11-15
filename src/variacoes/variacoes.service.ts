import { Injectable, Logger } from '@nestjs/common';
import md5 from 'md5';
import { Variacao } from './interfaces';

@Injectable()
export class VariacoesService {
  private readonly logger = new Logger(VariacoesService.name);

  inserirValorPadraoNasVaricaoes(valorPadrao: string, variacoes: Variacao[]) {
    this.logger.log('inserirValorPadraoNasVaricaoes');

    const pesoTotalVariacoes = variacoes.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual.peso,
      0,
    );

    variacoes.unshift({
      valor: valorPadrao,
      peso: 100 - pesoTotalVariacoes,
    });
  }

  calculateHash(userId: string, salt: string) {
    this.logger.log('calculateHash', userId, salt);

    const seed = userId + salt;
    const hashedSeed = md5(seed);
    const quarter = hashedSeed.substring(0, 8);

    return parseInt(quarter, 16) / 0xffffffff;
  }
}
