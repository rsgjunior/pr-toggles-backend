type AllowedOperators = '<' | '>' | '==' | '===' | '>=' | '<=' | 'includes';

interface Regra {
  key: string;
  operation: AllowedOperators;
  value: any;
}

const agregado: Array<Array<Regra>> = [];

agregado.push([
  {
    key: 'idade',
    operation: '>',
    value: '21',
  },
]);

agregado.push([
  {
    key: 'idade',
    operation: '<',
    value: 15,
  },
  {
    key: 'nome',
    operation: '==',
    value: 'Ciclano',
  },
]);

console.log('Agregado de regras: ', agregado);

const contexto = {
  idade: 14,
  nome: 'Ciclano',
  id: 2,
};

console.log('Contexto: ', contexto);

interface OperatorRuleInterface {
  allowedTypes: string[];
  allowedInstanceOf: any[];
}

class OperatorRule implements OperatorRuleInterface {
  allowedTypes: string[];
  allowedInstanceOf: any[];

  constructor(allowedTypes: string[], allowedInstanceOf: any[] = []) {
    this.allowedTypes = allowedTypes;
    this.allowedInstanceOf = allowedInstanceOf;
  }

  testRule(value: any): boolean {
    console.log('testRule', value);
    console.log('allowedTypes', this.allowedTypes);
    console.log('allowedInstanceOf', this.allowedInstanceOf);

    if (this.allowedTypes.length && !this.allowedTypes.includes(typeof value)) {
      console.log('type false');
      return false;
    }

    if (
      this.allowedInstanceOf.length &&
      !this.allowedInstanceOf.some((e) => value instanceof e)
    ) {
      console.log('instance false');
      return false;
    }

    return true;
  }
}

function validarTipoDoValorDoContexto(
  value: any,
  operation: AllowedOperators,
): boolean {
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

  if (!rulesForThisOperation.some((rule) => rule.testRule(value))) {
    return false;
  }

  return true;
}

function validarRegra(regra: Regra, contexto: object): boolean {
  const { key, operation, value } = regra;

  if (!(key in contexto)) {
    return false;
  }

  const valorNoContexto = contexto[key];

  if (!validarTipoDoValorDoContexto(valorNoContexto, operation)) {
    console.log('validarTipoDoValorDoContexto false');
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
      return value.includes(valorNoContexto);
    default:
      console.log('operador não registrado');
  }

  return false;
}

const result = agregado.some((conjunto) =>
  conjunto.every((regra) => validarRegra(regra, contexto)),
);

console.log('result:', result);
