import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { IoGameControllerOutline } from "react-icons/io5";
import { ethers } from "ethers";
import tokenABI from "../../constants/tokenABI"; // Import Token ABI

const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your token's address

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Games", link: "/" },
  { id: 3, name: "Media", link: "/" },
  { id: 4, name: "FAQ & Support", link: "/" },
];

const Navbar = ({ handleOrderPopup }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [error, setError] = useState(null);

  // Connect MetaMask & Fetch Balances
  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      // Fetch balances
      fetchBalances(provider, address);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("MetaMask connection failed");
    }
  };

  // Fetch ETH & Token Balances
  const fetchBalances = async (provider, address) => {
    try {
      // Fetch ETH Balance
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));

      // Fetch LocalToken (LTK) Balance
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenABI, provider);
      const rawBalance = await tokenContract.balanceOf(address);
      const decimals = await tokenContract.decimals();
      setTokenBalance(ethers.formatUnits(rawBalance, decimals));
    } catch (error) {
      console.error("Error fetching balances:", error);
      setError(error.message);
    }
  };

  // Auto-fetch balances if already connected
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.send("eth_accounts", []).then((accounts) => {
        if (accounts.length) {
          setAccount(accounts[0]);
          fetchBalances(provider, accounts[0]);
        }
      });
    }
  }, []);

  return (
    <div className="shadow-md bg-white dark:bg-slate-800 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-xl flex gap-1 items-center">
              <IoGameControllerOutline size="40" />
              zk-arcade
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-lg border border-gray-300 py-1 px-2
                text-sm focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-slate-800"
              />
              <IoMdSearch className="text-slate-800 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* MetaMask Connect Button & Balance Display */}
            <button
              onClick={connectMetaMask}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg transition transform hover:scale-110 duration-300"
            >
              {account ? (
                <span>
                  {account.slice(0, 6)}...{account.slice(-4)} | {balance && `${parseFloat(balance).toFixed(2)} ETH`} | {tokenBalance && `${parseFloat(tokenBalance).toFixed(2)} LTK`}
                </span>
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
