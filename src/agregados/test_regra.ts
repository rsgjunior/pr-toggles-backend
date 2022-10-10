interface Regra {
  key: string;
  operation: string;
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
