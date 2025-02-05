import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { FiShoppingBag } from "react-icons/fi";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Games",
    link: "/",
  },
  {
    id: 3,
    name: "Media",
    link: "/",
  },
  {
    id: 4, // Changed id here to avoid duplicate
    name: "FAQ & Support",
    link: "/",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [account, setAccount] = useState(null);

  // Function to handle MetaMask connection
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        alert(`Connected with ${accounts[0]}`);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("MetaMask connection failed");
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  return (
    <div className="shadow-md bg-white dark:bg-slate-800 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-xl items-center flex gap-1">
              <FiShoppingBag size="30" />
              zk-arcade
            </a>
          </div>

          {/* Search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-lg border border-gray-300 py-1 px-2
                text-sm focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-slate-800 "
              />
              <IoMdSearch className="text-slate-800 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>


            {/* MetaMask Connect Button */}
            <button
              onClick={connectMetaMask}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg transition transform hover:scale-110 duration-300"
            >
              {account ? (
                <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
              ) : (
                <span>Connect MetaMask</span>
              )}
            </button>

            {/* Darkmode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center pb-2 pt-4">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
