import { useState } from "react";
import NeoButton from "./NeoButton";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-[3px] border-foreground">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold">
            Alex<span className="text-primary">.</span>dev
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-bold uppercase tracking-wide hover:bg-primary px-2 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <NeoButton variant="primary" size="sm">
              Hire Me
            </NeoButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden neo-button bg-background p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block font-bold uppercase tracking-wide hover:bg-primary px-2 py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <NeoButton variant="primary" size="sm" className="w-full">
              Hire Me
            </NeoButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
