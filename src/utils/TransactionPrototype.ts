export interface TransactionPrototype {
  clone(): TransactionPrototype;
}

export class Transaction implements TransactionPrototype {
  constructor(
    public id: string,
    public crypto: string,
    public amount: number,
    public price: number,
    public timestamp: number,
    public isApproved: boolean,
  ) {}

  clone(): TransactionPrototype {
    return new Transaction(
      this.id,
      this.crypto,
      this.amount,
      this.price,
      this.timestamp,
      this.isApproved,
    );
  }
}
