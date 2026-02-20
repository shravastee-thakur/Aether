import React from "react";
import { Twitter, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#172b4d] text-slate-300 pt-10 pb-6">
      <div className="container mx-auto px-6 md:px-12">
        {/* --- TOP SECTION: 4 COLUMNS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-900/50">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Aether
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The workspace that moves at the speed of thought. Bridging
              planning and execution for the teams of tomorrow.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: About Aether */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              About Aether
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Apps & Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  Web App
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  iOS & Android
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  Desktop (Mac/Win)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-500 mt-0.5" />
                <a
                  href="mailto:hello@aether.work"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  hello@aether.work
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  101 Maker Towers, Nariman Point,
                  <br />
                  Mumbai, India 400000
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-500 mt-0.5" />
                <a
                  href="tel:+15550199"
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                >
                  +91 (22) 1111 1111
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION: COPYRIGHT --- */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white text-sm text-center md:text-left">
            Copyright © 2026 Shravastee Thakur.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-slate-500 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
