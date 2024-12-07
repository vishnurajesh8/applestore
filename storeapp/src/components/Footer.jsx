import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-2xl font-bold text-emerald-500 mb-4">
              <span className="text-white">Apple</span> Store
            </div>
            <p className="text-sm text-gray-400">
              Your favorite place to shop for the latest Apple products.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <a href="/" className="text-gray-400 hover:text-emerald-500 mb-2">Home</a>
            <a href="/shop" className="text-gray-400 hover:text-emerald-500 mb-2">Shop</a>
            <a href="/about" className="text-gray-400 hover:text-emerald-500 mb-2">About Us</a>
            <a href="/contact" className="text-gray-400 hover:text-emerald-500 mb-2">Contact</a>
          </div>

          {/* Contact Information Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              <i className="fas fa-phone-alt mr-2"></i> +1 (234) 567-8901
            </p>
            <p className="text-gray-400 mb-2">
              <i className="fas fa-envelope mr-2"></i> support@applestore.com
            </p>
            <p className="text-gray-400 mb-2">
              <i className="fas fa-map-marker-alt mr-2"></i> 456 Your St, Your City, Your Country
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-r-md hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="https://facebook.com" className="text-gray-400 hover:text-emerald-500">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-emerald-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-emerald-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-emerald-500">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 text-gray-400 py-4 mt-12">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Apple Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
