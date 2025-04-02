import { Link } from 'react-router-dom';
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import React from "react";


const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-black py-6">
      <div className="container mx-auto flex justify-between items-center px-12">
        {/* Brand Name */}
        <span className="text-3xl text-[#00ff00] font-bold tracking-tight ml-12">
          <Link to="/">MindEase Therapy</Link>
        </span>

        {/* Navigation Links */}
        <span className="flex space-x-4 mr-12">
        {isLoggedIn ? (
  <>
    <Link
      className="flex items-center text-[#00ff00] px-4 py-2 font-bold rounded-md hover:bg-[#008000] hover:text-white transition duration-300"
      to="/my-bookings"
    >
      My Appointments
    </Link>
    <Link
      className="flex items-center text-[#00ff00] px-4 py-2 font-bold rounded-md hover:bg-[#008000] hover:text-white transition duration-300"
      to="/my-clinics"
    >
      My Clinics
    </Link>
    <SignOutButton />
  </>
) : (
  <Link
    to="/sign-in"
    className="flex bg-[#00ff00] items-center text-black px-4 py-2 font-bold rounded-md hover:bg-[#008000] transition duration-300"
  >
    Sign In
  </Link>
)}
        </span>
      </div>
    </div>
  );
};

export default Header;
