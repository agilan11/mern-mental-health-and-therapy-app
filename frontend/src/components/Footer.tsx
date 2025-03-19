import React from "react";

const Footer = () => {
    return (
      <div className="bg-black py-10">
        <div className="container mx-auto flex justify-between items-center px-12">
          {/* Brand Name */}
          <span className="text-3xl text-[#00ff00] font-bold tracking-tight ml-12">
            MindEase Therapy
          </span>
  
          {/* Links */}
          <span className="text-white font-bold tracking-tight flex gap-6">
            <p className="cursor-pointer hover:text-[#00ff00] transition duration-300">
              Privacy Policy
            </p>
            <p className="cursor-pointer hover:text-[#00ff00] transition duration-300">
              Terms of Service
            </p>
            <p className="cursor-pointer hover:text-[#00ff00] transition duration-300">
              Contact Us
            </p>
          </span>
        </div>
      </div>
    );
  };
  
  export default Footer;
  