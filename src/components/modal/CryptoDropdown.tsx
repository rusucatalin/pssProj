import Dropdown from "components/dropdown";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToPortfolioCommand } from "commands/AddToPortfolioCommand";
import { RootState } from "store";

interface CryptoDropdownProps {
  cryptoName: string;
  cryptoSymbol: string;
}

const CryptoDropdown: React.FC<CryptoDropdownProps> = ({
  cryptoName,
  cryptoSymbol,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth);

  const handleAddToPortfolio = async () => {
    if (user.uid && amount > 0) {
      const command = new AddToPortfolioCommand(user.uid, cryptoName, amount);
      await command.execute();
      setAmount(0);
    } else {
      alert("Please provide a valid amount and make sure you are signed in.");
    }
  };

  return (
    <Dropdown
      button={
        <button className="px-3 py-1 text-xs text-green-500 border border-green-500 rounded-full">
          {cryptoSymbol} - Buy
        </button>
      }
      classNames="bg-white shadow-lg p-4 rounded-lg"
      animation="origin-top-right transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="px-4 py-2 border rounded-md"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-full"
          onClick={handleAddToPortfolio}
        >
          Add to Portfolio
        </button>
      </div>
    </Dropdown>
  );
};

export default CryptoDropdown;
