import React, { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import CheckTable from "view/tables/components/CheckTable";

function Portfolio() {
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
    <div className="App">
      <CheckTable userId={userId} />
    </div>
  );
}

export default Portfolio;
