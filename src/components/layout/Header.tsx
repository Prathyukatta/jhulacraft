import { useState } from "react";
import { Phone, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram } from "react-icons/fa";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Products", path: "/products" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 font-poppins">
        {/* Top Bar (keep black) */}
        <div className="bg-black text-white py-1 text-[11px] sm:text-xs">
          <div className="container-custom flex flex-col sm:flex-row justify-between items-center gap-2">
            {/* ORDER NOW as plain text */}
            <div className="flex-shrink-0">
              <span className="text-white font-medium">ORDER NOW</span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-[11px]">
              <div className="flex items-center gap-1">
                <Mail size={12} />
                <span>thejhulacraft@gmail.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={12} />
                <span>+91 8106815081</span>
              </div>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C62828]"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD700]"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="bg-white border-b shadow-sm py-3">
          <div className="container-custom flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/Logo.png"
                alt="JhulaCraft Logo"
                className="hidden md:block h-10 w-auto"
              />
              <img
                src="/Logo.png"
                alt="JhulaCraft Logo"
                className="md:hidden h-8 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-black hover:text-[#6A1B1A] font-medium transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C62828] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}

              {/* ORDER NOW button with gradient */}
              <Button
                asChild
                className="bg-gradient-to-r from-[#B80735] to-[#EC6788] hover:opacity-90 text-white"
              >
                <Link to="/products">ORDER NOW</Link>
              </Button>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md border-t">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-3 border-b text-black font-medium text-center hover:text-[#6A1B1A]"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 py-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#B80735] to-[#EC6788] hover:opacity-90 text-white"
              >
                <Link to="/products" onClick={() => setMenuOpen(false)}>
                  ORDER NOW
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Padding so content doesn’t hide behind header */}
      <div className="pt-[80px]" />
    </>
  );
};
