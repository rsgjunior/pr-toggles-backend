interface OperatorRuleInterface {
  allowedTypes: string[];
  allowedInstanceOf: any[];
}

export class OperatorRule implements OperatorRuleInterface {
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
