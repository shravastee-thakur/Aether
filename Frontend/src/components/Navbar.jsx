import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#48B3AF] border-b border-gray-100 fixed w-full z-50 top-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LEFT: Brand Name */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-3xl font-extrabold text-white">Aether</span>
          </div>

          {/* RIGHT: Desktop Login Button */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <button className="bg-[#476EAE] hover:bg-sky-600 text-white font-medium py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Enter the Aether
            </button>
          </div> */}

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-[#00c7e5] focus:outline-none transition-colors"
            >
              {isOpen ? (
                // Close Icon
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Menu Icon
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg animate-fade-in-down">
          <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col items-center">
            <button className="w-full bg-[#00c7e5] text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-sky-500 transition-colors">
              Enter the Aether
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
