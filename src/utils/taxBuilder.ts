export interface TaxReport {
  tax: number;
  profitLoss: number;
}

export class TaxBuilder {
  private totalIncome: number = 0;
  private totalExpenses: number = 0;
  private taxRate: number = 0;

  setIncome(income: number): this {
    this.totalIncome = income;
    return this;
  }

  setExpenses(expenses: number): this {
    this.totalExpenses = expenses;
    return this;
  }

  setTaxRate(rate: number): this {
    this.taxRate = rate;
    return this;
  }

  calculate(): TaxReport {
    const profitLoss = this.totalIncome - this.totalExpenses;
    const tax = profitLoss > 0 ? profitLoss * this.taxRate : 0;
    return { tax, profitLoss };
  }
}
