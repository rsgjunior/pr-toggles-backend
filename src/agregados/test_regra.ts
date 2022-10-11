type AllowedOperators = '<' | '>' | '==' | '===' | '>=' | '<=' | 'includes';

interface Regra {
  key: string;
  operation: AllowedOperators;
  value: string | number | Array<any>;
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
    value: '15',
  },
  {
    key: 'nome',
    operation: '==',
    value: 'Ciclano',
  },
]);

console.log('Agregado de regras: ', agregado);

const contexto = {
  idade: '14',
  nome: 'Ciclano',
  id: 2,
};

console.log('Contexto: ', contexto);

class OperatorRule {
  #allowedTypes: string[] | undefined;
  #allowedInstanceOf: any;

  constructor(
    allowedTypes: string[] | undefined = undefined,
    allowedInstanceOf = undefined,
  ) {
    this.#allowedTypes = allowedTypes;
    this.#allowedInstanceOf = allowedInstanceOf;
  }
}

function validarTipoDoValorDoContexto(
  value: any,
  operation: AllowedOperators,
): boolean {
  const newRule = (allowedTypes = undefined, allowedInstanceOf = undefined) => {
    return new OperatorRule(allowedTypes, allowedInstanceOf);
  };

  const rules = {
    '>': [new OperatorRule(['number'])],
    '<': [new OperatorRule(['number'])],
    '>=': [new OperatorRule(['number'])],
    '<=': [new OperatorRule(['number'])],
    '==': [],
    '===': [],
    includes: [
      new OperatorRule(['string']),
      new OperatorRule(['object'], [Array]),
    ],
  };

  return false;
}

function validarRegra(regra: Regra, contexto: object): boolean {
  const { key, operation, value } = regra;

  if (!(key in contexto)) {
    return false;
  }

  const valorNoContexto = contexto[key];

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
    default:
      console.log('operador não registrado');
  }

  return false;
}

const result = agregado.some((conjunto) =>
  conjunto.every((regra) => validarRegra(regra, contexto)),
);

console.log('result:', result);
