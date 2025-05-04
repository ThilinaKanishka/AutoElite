import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: <FaFacebook />, url: "#" },
    { icon: <FaTwitter />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
    { icon: <FaLinkedin />, url: "#" },
  ];

  const quickLinks = [
    { title: "Home", path: "/" },
    { title: "Inventory", path: "/inventory" },
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Financing", path: "/financing" },
    { title: "Testimonials", path: "/testimonials" },
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: "123 Auto Drive, Elite City, EC 12345" },
    { icon: <FaPhone />, text: "(555) 123-4567" },
    { icon: <FaEnvelope />, text: "info@autoelite.com" },
    { icon: <FaClock />, text: "Mon-Fri: 9AM - 7PM | Sat: 10AM - 5PM" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold text-red-600">
                Auto<span className="text-white">Elite</span>
              </span>
            </Link>
            <p className="text-gray-300">
              Your premier destination for luxury and performance vehicles. We
              offer the finest selection with exceptional service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-300 hover:text-red-500 text-xl transition-all duration-300 transform hover:scale-110"
                  aria-label={`${social.icon.type.displayName} link`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-red-600 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`text-gray-300 hover:text-red-500 transition-all duration-300 flex items-center ${
                      activeLink === index ? "text-red-500" : ""
                    }`}
                    onMouseEnter={() => setActiveLink(index)}
                    onMouseLeave={() => setActiveLink(null)}
                  >
                    <span
                      className="w-2 h-2 bg-red-600 rounded-full mr-2 transition-all duration-300 opacity-0"
                      style={{ opacity: activeLink === index ? 1 : 0 }}
                    />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-red-600 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">{item.icon}</span>
                  <span className="text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-red-600 pb-2 inline-block">
              Newsletter
            </h3>
            <p className="text-gray-300">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-all duration-300 transform hover:scale-105 w-full ${
                  isSubscribed ? "bg-green-600 hover:bg-green-700" : ""
                }`}
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AutoElite. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-red-500 text-sm transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-red-500 text-sm transition"
            >
              Terms of Service
            </Link>
            <Link
              to="/sitemap"
              className="text-gray-400 hover:text-red-500 text-sm transition"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
