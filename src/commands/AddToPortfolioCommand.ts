import { addToPortfolio } from "services/portfolioService";

export class AddToPortfolioCommand {
  private userId: string;
  private cryptoName: string;
  private amount: number;

  constructor(userId: string, cryptoName: string, amount: number) {
    this.userId = userId;
    this.cryptoName = cryptoName;
    this.amount = amount;
  }

  async execute() {
    if (this.userId && this.amount > 0) {
      try {
        await addToPortfolio(this.userId, this.cryptoName, this.amount);
        alert("Transaction recorded. Check your portfolio for approved items.");
      } catch (error) {
        console.error("Error adding to portfolio:", error);
        alert("An error occurred while processing your transaction.");
      }
    } else {
      alert("Please provide a valid amount and make sure you are signed in.");
    }
  }
}
