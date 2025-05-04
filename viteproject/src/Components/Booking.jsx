import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Navigation/Header";
import Footer from "./Navigation/footer";
import { FaMoon, FaSun } from "react-icons/fa";

const BookingPage = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle || {};

  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or user preference for dark mode
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nic: "",
    birthDate: null,
    address: "",
    price: vehicle.price || "",
    gender: "",
    email: "",
    phone: "",
    bookingDate: null,
    paymentMethod: "cash",
    termsAgreed: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Apply dark mode class to body element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.bookingDate)
      newErrors.bookingDate = "Booking date is required";
    if (!formData.termsAgreed)
      newErrors.termsAgreed = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData);
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for your booking. We've sent a confirmation to{" "}
            {formData.email}.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-left mb-6">
            <h3 className="font-semibold mb-2 dark:text-white">
              Booking Details:
            </h3>
            <p className="dark:text-gray-300">
              Name: {formData.firstName} {formData.lastName}
            </p>
            <p className="dark:text-gray-300">
              Vehicle Price: ${formData.price}
            </p>
            <p className="dark:text-gray-300">
              Booking Date: {formData.bookingDate?.toLocaleDateString()}
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 z-50"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Complete Your Booking
            </h1>
            {vehicle.model && (
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                You're booking:{" "}
                <span className="font-semibold">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </span>
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* NIC */}
                <div>
                  <label
                    htmlFor="nic"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    NIC/Passport Number *
                  </label>
                  <input
                    type="text"
                    id="nic"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.nic
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.nic && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.nic}
                    </p>
                  )}
                </div>

                {/* Birth Date */}
                <div>
                  <label
                    htmlFor="birthDate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Birth Date *
                  </label>
                  <DatePicker
                    selected={formData.birthDate}
                    onChange={(date) => handleDateChange(date, "birthDate")}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select date"
                    className={`mt-1 block w-full border ${
                      errors.birthDate
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                  />
                  {errors.birthDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.birthDate}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gender *
                  </label>
                  <div className="mt-1 space-y-2">
                    {["Male", "Female", "Other"].map((option) => (
                      <label
                        key={option}
                        className="inline-flex items-center mr-4"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option.toLowerCase()}
                          checked={formData.gender === option.toLowerCase()}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.gender}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Vehicle Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.price
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.address
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Booking Date */}
                <div>
                  <label
                    htmlFor="bookingDate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Preferred Booking Date *
                  </label>
                  <DatePicker
                    selected={formData.bookingDate}
                    onChange={(date) => handleDateChange(date, "bookingDate")}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select date"
                    className={`mt-1 block w-full border ${
                      errors.bookingDate
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.bookingDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.bookingDate}
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="cash">Cash</option>
                    <option value="credit">Credit Card</option>
                    <option value="finance">Financing</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAgreed"
                    name="termsAgreed"
                    type="checkbox"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="termsAgreed"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                    >
                      terms and conditions
                    </a>
                  </label>
                  {errors.termsAgreed && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.termsAgreed}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
