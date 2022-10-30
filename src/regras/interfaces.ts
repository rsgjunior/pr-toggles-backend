type AllowedOperators = '<' | '>' | '==' | '===' | '>=' | '<=' | 'includes';

interface Regra {
  key: string;
  operation: AllowedOperators;
  value: any;
}

export { AllowedOperators, Regra };
