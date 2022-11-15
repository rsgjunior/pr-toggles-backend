import { Injectable, Logger } from '@nestjs/common';
import { OperatorRule } from './operator-rule';

@Injectable()
export class RegrasService {
  private readonly logger = new Logger(RegrasService.name);

  validarTipoDoValorDoContexto(
    value: any,
    operation: AllowedOperators,
  ): boolean {
    this.logger.log('validarTipoDoValorDoContexto');

    const allOperatorsRules = {
      '>': [new OperatorRule(['number'])],
      '<': [new OperatorRule(['number'])],
      '>=': [new OperatorRule(['number'])],
      '<=': [new OperatorRule(['number'])],
      '==': [],
      '===': [],
      // eslint-disable-next-line prettier/prettier
      'includes': [
        new OperatorRule(['string']),
        new OperatorRule(['object'], [Array]),
      ],
    };

    const rulesForThisOperation = allOperatorsRules[operation];

    if (
      rulesForThisOperation.length &&
      !rulesForThisOperation.some((rule) => rule.testRule(value))
    ) {
      return false;
    }

    return true;
  }

  validarRegra(regra: Regra, contexto: object): boolean {
    this.logger.log('validarRegra', regra, contexto);

    const { key, operation, value } = regra;

    if (!(key in contexto)) {
      return false;
    }

    const valorNoContexto = contexto[key];

    if (!this.validarTipoDoValorDoContexto(valorNoContexto, operation)) {
      return false;
    }

    switch (operation) {
      case '>':
        return valorNoContexto > value;
      case '<':
        return valorNoContexto < value;
      case '==':
        return valorNoContexto == value;
      case '===':
        return valorNoContexto === value;
      case '>=':
        return valorNoContexto >= value;
      case '<=':
        return valorNoContexto <= value;
      case 'includes':
        return valorNoContexto.includes(value);
      default:
        this.logger.log('operador não registrado');
    }

    return false;
  }

  validarAgregadoDeRegras(agregado: Agregado, contexto: object) {
    return agregado.some((conjunto) =>
      conjunto.every((regra) => this.validarRegra(regra, contexto)),
    );
  }
}
