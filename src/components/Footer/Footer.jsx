import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white">MangaMart</h1>
          <p className="mt-2 text-sm text-gray-400">
            Discover, collect, and sell your favorite manga. A modern e-commerce platform for manga lovers.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/all-books" className="hover:text-white transition">Browse Manga</a></li>
            <li><a href="/sell" className="hover:text-white transition">Sell Manga</a></li>
            <li><a href="/" className="hover:text-white transition">About Us</a></li>
          </ul>
        </div>

        {/* Contact / Social Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Connect</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:support@mangamart.com" className="hover:text-white transition">support@mangamart.com</a></li>
            <li><a href="#" className="hover:text-white transition">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition">Discord</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MangaMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;