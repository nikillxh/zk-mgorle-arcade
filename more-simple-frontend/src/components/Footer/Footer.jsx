import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";

const FooterLinks = [
  { title: "Home", link: "/#" },
  { title: "About", link: "/#about" },
  { title: "Contact", link: "/#contact" },
  { title: "Blog", link: "/#blog" },
];

const Footer = () => {
  return (
    <div className="text-white bg-[#212529]">
      <div className="container py-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Company Details */}
          <div className="px-4">
            <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <IoGameControllerOutline size="30" />
              zk-arcade {/* Change as per your branding */}
            </h1>
            <p className="text-gray-300">
              Discover and play the best games. Enjoy a seamless gaming experience with us.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div className="px-4">
              <h1 className="text-lg font-bold mb-3">Important Links</h1>
              <ul className="flex flex-col gap-2">
                {FooterLinks.map((link) => (
                  <li key={link.title} className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200">
                    {link.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-4">
              <h1 className="text-lg font-bold mb-3">Quick Links</h1>
              <ul className="flex flex-col gap-2">
                {FooterLinks.map((link) => (
                  <li key={link.title} className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200">
                    {link.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & Contact */}
            <div className="px-4">
              <h1 className="text-lg font-bold mb-3">Follow Us</h1>
              <div className="flex items-center gap-4">
                <a href="#" className="text-3xl hover:text-primary duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="text-3xl hover:text-primary duration-300">
                  <FaFacebook />
                </a>
                <a href="#" className="text-3xl hover:text-primary duration-300">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
