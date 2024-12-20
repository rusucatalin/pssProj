import UserMenu from "components/card/userMenu";
import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { uid, email } = useSelector((state: any) => state.auth);

  return (
    <div className="p-6 relative">
      <div className="absolute top-4 right-4">
        <UserMenu uid={uid} email={email} />
      </div>
      {/* <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          UID: {uid}
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Email: {email}</p>
      </div> */}
    </div>
  );
}
