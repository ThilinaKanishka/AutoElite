import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const navigate = useNavigate();

  const [navItems] = useState([
    { path: "/", label: "Home" },
    { path: "/inventory", label: "Inventory" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo animation effects
  const [logoScale, setLogoScale] = useState(1);
  const [logoRotation, setLogoRotation] = useState(0);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setLogoScale(1.05);
      setTimeout(() => setLogoScale(1), 1000);
    }, 8000);

    const rotateInterval = setInterval(() => {
      setLogoRotation(2);
      setTimeout(() => setLogoRotation(0), 500);
    }, 15000);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(rotateInterval);
    };
  }, []);

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleBookNow = () => {
    navigate("/Booking");
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-red-600 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            <span
              className="text-3xl font-bold text-white relative"
              style={{
                transform: `scale(${logoScale}) rotate(${
                  isHoveringLogo ? 5 : logoRotation
                }deg)`,
                transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                textShadow: isScrolled ? "none" : "0 2px 10px rgba(0,0,0,0.3)",
                display: "inline-block",
              }}
            >
              Auto
              <span
                className="text-white"
                style={{
                  display: "inline-block",
                  transform: `scale(${isHoveringLogo ? 1.1 : 1})`,
                  transition: "transform 0.3s ease",
                }}
              >
                Elite
              </span>
              {isHoveringLogo && (
                <span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-white rounded-full"
                  style={{
                    animation: "expand 0.3s forwards",
                    transformOrigin: "left center",
                  }}
                ></span>
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-all duration-300 ${
                  isScrolled ? "text-gray-800" : "text-white"
                } group`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">{item.label}</span>
                {hoveredItem === index && (
                  <>
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
                      style={{
                        animation: "underlineGrow 0.3s forwards",
                        transformOrigin: "left center",
                      }}
                    />
                    <span
                      className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        transform: "translateX(-50%)",
                        transition: "all 0.3s ease",
                        animation: "bounce 2s infinite",
                      }}
                    />
                  </>
                )}
              </Link>
            ))}
            <button
              onClick={handleBookNow}
              className={`ml-4 px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/30"
                  : "bg-white hover:bg-gray-100 text-red-600 shadow-lg hover:shadow-gray-400/30"
              } transform hover:scale-105 active:scale-95 relative overflow-hidden`}
            >
              <div className="relative">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  Book Now
                </span>
                <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  Reserve
                </span>
              </div>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-between items-center">
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? "bg-gray-800" : "bg-white"
                } ${
                  mobileMenuOpen ? "transform rotate-45 translate-y-2.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? "bg-gray-800" : "bg-white"
                } ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? "bg-gray-800" : "bg-white"
                } ${
                  mobileMenuOpen ? "transform -rotate-45 -translate-y-2.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
            mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
          style={{
            background: isScrolled ? "white" : "rgba(255,255,255,0.95)",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <div className="pt-4 pb-8 space-y-4 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-3 text-gray-800 font-medium hover:text-red-600 transition-all duration-300 transform hover:translate-x-2 rounded-lg hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleBookNow}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-red-500/40"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Book Now</span>
                <svg
                  className="w-4 h-4 animate-bounce-horizontal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes expand {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        @keyframes underlineGrow {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        @keyframes bounce-horizontal {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s infinite;
        }
      `}</style>
    </header>
  );
}

export default Header;
