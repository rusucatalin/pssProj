import React from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineUser, AiOutlineLogout, AiOutlineShop } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { TiLightbulb } from "react-icons/ti";
import Dropdown from "../dropdown/index";

interface UserMenuProps {
  uid: string;
  email: string;
}

function UserMenu({ uid, email }: UserMenuProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/auth/signIn");
  };

  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center text-xl hover:cursor-pointer bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 linear justify-center rounded-lg font-bold transition duration-200"
        >
          <BsThreeDots className="h-6 w-6" />
        </button>
      }
      animation="origin-top-right transition-all duration-300 ease-in-out"
      classNames="top-11 right-0 w-max"
    >
      <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="border-b border-gray-200 pb-3 mb-3">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">UID:</span> {uid}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            <span className="font-semibold">Email:</span> {email}
          </p>
        </div>

        {/* <p className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium">
          <span>
            <AiOutlineUser />
          </span>
          Profile
        </p> */}
        {/* <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
          <span>
            <AiOutlineShop />
          </span>
          Dashboard
        </p> */}
        {/* <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
          <span>
            <TiLightbulb />
          </span>
          Settings
        </p> */}
        <p
          className="hover:text-red-500 mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
          onClick={handleLogout}
        >
          <span>
            <AiOutlineLogout />
          </span>
          Logout
        </p>
      </div>
    </Dropdown>
  );
}

export default UserMenu;
