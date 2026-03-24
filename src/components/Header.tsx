import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      {/* Main Header */}
      {/* BG white */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? "backdrop-glass shadow-medium"
          : "bg-background/95 backdrop-blur-sm"
          }`}
      >

        {/* BG blue */}
        {/* <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0B41E3] shadow-medium"    // Background when scrolled
            : "bg-[#0B41E3]/95 backdrop-blur-sm" // Background when not scrolled, slightly transparent
        }`}
> */}
        <div className="container-custom py-2">
          <div className="flex items-center">
            <div className="flex items-center px-2 py-1 min-w-[150px] justify-center mr-8">
              <Link to="/">
                <img
                  src="/airvlt_logo_v3.png"
                  alt="Airvlt Logo"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-16 ml-24">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href ||
                  (item.href === "/" && location.pathname === "/") ||
                  (item.href.startsWith("/#") && location.pathname === "/" && location.hash === item.href.substring(1));

                return item.href.startsWith("/#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`text-foreground hover:text-primary transition-colors duration-200 font-medium relative group ${isActive ? 'text-primary' : ''
                      }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-foreground hover:text-primary transition-colors duration-200 font-medium relative group ${isActive ? 'text-primary' : ''
                      }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side - Trusted Partners */}
            {/* <div className="hidden lg:flex items-center gap-4 border-l border-border/50 pl-6 ml-auto">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
                  <img src="/iata_v2.png" alt="IATA" className="h-14 w-auto object-contain hover:scale-105 transition-transform" />
                  <img src="/jctrans.png" alt="JCTRANS" className="h-8 w-auto object-contain hover:scale-105 transition-transform" />
                  <img src="/gla_v2.png" alt="GLA" className="h-12 w-auto object-contain hover:scale-105 transition-transform" />
                </div>
              </div>
            </div> */}

            {/* Right Side Section */}
            <div className="hidden lg:flex items-center gap-6 ml-auto">

              {/* Buttons */}
              <div className="flex items-center gap-3">

                {/* <Button variant="outline-animated" asChild>
                  <Link to="/track-trace">Track & Trace</Link>
                </Button> */}

                {/* ✅ Internship Button */}
                <Button variant="outline-animated" asChild>
                  <Link to="/internship">Internship</Link>
                </Button>
                {/* 
                <Button variant="gradient-primary">
                  Get Quote
                </Button> */}

              </div>

              {/* Trusted Logos */}
              <div className="flex items-center gap-4 border-l border-border/50 pl-6">
                <img src="/iata_v2.png" className="h-14 w-auto object-contain hover:scale-105 transition-transform" />
                <img src="/jctrans.png" className="h-8 w-auto object-contain hover:scale-105 transition-transform" />
                <img src="/gla_v2.png" className="h-12 w-auto object-contain hover:scale-105 transition-transform" />
              </div>

            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-border animate-slide-up">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.href ||
                    (item.href === "/" && location.pathname === "/") ||
                    (item.href.startsWith("/#") && location.pathname === "/" && location.hash === item.href.substring(1));

                  return item.href.startsWith("/#") ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 ${isActive ? 'text-primary' : ''
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 ${isActive ? 'text-primary' : ''
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="outline-animated" asChild>
                    <Link to="/track-trace">Track & Trace</Link>
                  </Button>
                  <Button variant="gradient-primary">
                    Get Quote
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header >
    </>
  );
};

export default Header;