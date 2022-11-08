type AllowedOperators = '<' | '>' | '==' | '===' | '>=' | '<=' | 'includes';
type Agregado = Regra[][];

interface Regra {
  key: string;
  operation: AllowedOperators;
  value: any;
}

const agregado: Agregado = [];

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

agregado.push([
  {
    key: 'role',
    operation: 'includes',
    value: 'sysadmin',
  },
]);

console.log('Agregado de regras: ', agregado);

const contexto = {
  idade: '15',
  nome: 'Ciclano',
  id: 2,
  role: ['sysadmin', 'moderador', 'usuario'],
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
    console.log('typeof value', typeof value);

    if (this.allowedTypes.length && !this.allowedTypes.includes(typeof value)) {
      console.log('type false');
      // should throw exception
      return false;
    }

    if (
      this.allowedInstanceOf.length &&
      !this.allowedInstanceOf.some((e) => value instanceof e)
    ) {
      console.log('instance false');
      // should throw exception
      return false;
    }

    console.log('testRule TRUE');
    return true;
  }
}

function validarTipoDoValorDoContexto(
  value: any,
  operation: AllowedOperators,
): boolean {
  console.log('validarTipoDoValorDoContexto', value, operation);

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

function validarRegra(regra: Regra, contexto: object): boolean {
  console.log('validarRegra', regra, contexto);

  const { key, operation, value } = regra;

  if (!(key in contexto)) {
    return false;
  }

  const valorNoContexto = contexto[key];

  if (!validarTipoDoValorDoContexto(valorNoContexto, operation)) {
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
      console.log('operador não registrado');
  }

  return false;
}

const result = agregado.some((conjunto) =>
  conjunto.every((regra) => validarRegra(regra, contexto)),
);

console.log('result:', result);
