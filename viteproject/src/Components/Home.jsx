import React from "react";
import { useState, useEffect } from "react";
import Header from "./Navigation/Header";
import Footer from "./Navigation/footer";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredCars = [
    {
      id: 1,
      name: "2023 Tesla Model S Plaid",
      price: "$89,990",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["1,020 hp", "0-60 mph in 1.99s", "396 mi range"],
    },
    {
      id: 2,
      name: "2023 Porsche 911 Turbo S",
      price: "$214,900",
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: ["640 hp", "Top speed 205 mph", "AWD"],
    },
    {
      id: 3,
      name: "2023 Land Rover Defender",
      price: "$53,700",
      image:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      features: ["296 hp", "8,201 lb towing", "Terrain Response 2"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* Hero Section */}
      <div className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>

        {/* Animated Background Slideshow */}
        <div className="absolute inset-0 overflow-hidden">
          {featuredCars.map((car, index) => (
            <div
              key={car.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${car.image})` }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
              Find Your Dream Car Today
            </h1>
            <p className="text-lg md:text-xl mb-8 animate-fadeIn delay-100">
              Explore our premium collection of luxury and performance vehicles
              with the best deals in the market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn delay-200">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition transform hover:scale-105 shadow-lg">
                Browse Inventory
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-medium transition transform hover:scale-105 shadow-lg">
                Book a Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 relative z-30 -mt-8 md:-mt-12">
        <div className="bg-white rounded-xl shadow-2xl p-6 animate-slideUp">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Make
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option>All Makes</option>
                <option>Tesla</option>
                <option>Porsche</option>
                <option>Land Rover</option>
                <option>BMW</option>
                <option>Mercedes</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Model
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option>All Models</option>
                <option>Model S</option>
                <option>911</option>
                <option>Defender</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price Range
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option>Any Price</option>
                <option>Under $30,000</option>
                <option>$30,000 - $50,000</option>
                <option>$50,000 - $100,000</option>
                <option>Over $100,000</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition transform hover:scale-105">
                Search Vehicles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Vehicles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our hand-picked selection of premium vehicles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    New Arrival
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {car.name}
                  </h3>
                  <p className="text-red-600 font-bold text-2xl mb-4">
                    {car.price}
                  </p>
                  <ul className="mb-6">
                    {car.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600 mb-2"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-medium transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-full font-medium transition">
              View All Inventory
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose AutoElite
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and the best vehicles in the market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Certified Pre-Owned
              </h3>
              <p className="text-gray-600">
                All our used vehicles go through a rigorous 150-point inspection
                process.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Best Financing
              </h3>
              <p className="text-gray-600">
                Get approved with competitive rates and flexible payment
                options.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Lifetime Warranty
              </h3>
              <p className="text-gray-600">
                Enjoy peace of mind with our comprehensive lifetime warranty
                program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 italic">
                "The team at AutoElite made my car buying experience seamless.
                They found me the perfect vehicle within my budget and the
                financing options were unbeatable."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Sarah J."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sarah J.</h4>
                  <p className="text-gray-400 text-sm">Verified Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 italic">
                "I've purchased three cars from AutoElite over the years. Their
                customer service is exceptional and they always go above and
                beyond to meet my needs."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Michael T."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Michael T.</h4>
                  <p className="text-gray-400 text-sm">Loyal Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 italic">
                "The lifetime warranty gives me so much peace of mind. I know my
                car is protected no matter what happens. Highly recommend
                AutoElite!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Jennifer L."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Jennifer L.</h4>
                  <p className="text-gray-400 text-sm">First-time Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showroom today or browse our online inventory to get
            started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white hover:bg-gray-100 text-red-600 px-8 py-3 rounded-full font-medium transition transform hover:scale-105 shadow-lg">
              Schedule Appointment
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full font-medium transition transform hover:scale-105">
              Call Now: (555) 123-4567
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
