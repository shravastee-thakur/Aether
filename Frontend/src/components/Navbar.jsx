import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, Settings, User, Layout } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-sm" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* --- LEFT: LOGO --- */}
          <div className="flex-shrink-0 cursor-pointer group">
            <div className="flex items-center gap-2">
              {/* Logo Icon (Abstract Aether Shape) */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
                A
              </div>
              {/* Logo Text */}
              <span className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                Aether
              </span>
            </div>
          </div>

          {/* --- RIGHT: AVATAR & DROPDOWN --- */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-3 pl-2 pr-1 py-1.5 rounded-full hover:bg-slate-100/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              aria-label="User menu"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-900 leading-none">
                  Alex Morgan
                </p>
               
              </div>

              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                  {/* Placeholder Avatar Image */}
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online Status Indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* --- DROPDOWN MENU --- */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in-up origin-top-right">
                <div className="py-1">
                  {/* Profile Link */}
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Profile</span>
                  </a>

                  {/* Workspace Link */}
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <Layout className="w-4 h-4 text-slate-400" />
                    <span>Workspace</span>
                  </a>

                  {/* Settings Link (Bonus) */}
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings</span>
                  </a>

                  <div className="border-t border-slate-100 my-1"></div>

                  {/* Logout Link */}
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- CUSTOM CSS FOR ANIMATION --- */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
