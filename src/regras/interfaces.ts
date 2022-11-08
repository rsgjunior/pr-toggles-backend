type AllowedOperators = '<' | '>' | '==' | '===' | '>=' | '<=' | 'includes';
type AgregadoDeRegras = Regra[][];

interface Regra {
  key: string;
  operation: AllowedOperators;
  value: any;
}

export { AllowedOperators, Regra, AgregadoDeRegras };
