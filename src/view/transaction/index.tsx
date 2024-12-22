import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TransactionTable from "view/tables/components/TransactionTable";

const Transaction = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userId) {
    return <div>Loading or not authenticated...</div>;
  }

  return (
    <div>
      <div className="mt-5 grid h-full gap-5">
        <TransactionTable userId={userId} />
      </div>
    </div>
  );
};

export default Transaction;
