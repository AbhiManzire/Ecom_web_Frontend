import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-dark text-white py-12 mt-auto overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="mb-4">
            <h5 className="text-lg font-semibold mb-3">About MearnSneakers</h5>
            <p className="text-gray-400 mb-6">
              Your premier destination for authentic sneakers, exclusive releases, and unbeatable deals.
            </p>
            <div className="flex space-x-3">
              <a href="/" className="text-white hover:text-gray-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="/" className="text-white hover:text-gray-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="/" className="text-white hover:text-gray-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="/" className="text-white hover:text-gray-400 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="text-lg font-semibold mb-3 tracking-widest uppercase">Collections</h5>
            <ul className="space-y-2">
              <li><a href="/category/men-clothing" className="text-gray-300 hover:text-white transition-colors text-sm">Men's Apparel</a></li>
              <li><a href="/category/ladies-clothing" className="text-gray-300 hover:text-white transition-colors text-sm">Ladies' Essentials</a></li>
              <li><a href="/category/kids-clothing" className="text-gray-300 hover:text-white transition-colors text-sm">Kids' Collection</a></li>
              <li><a href="/category/activewear" className="text-gray-300 hover:text-white transition-colors text-sm">Performance Sports</a></li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="text-lg font-semibold mb-3 tracking-widest uppercase">Support</h5>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">Help Center</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About Mearn</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-white transition-colors text-sm">Shipping Info</a></li>
              <li><a href="/profile" className="text-gray-300 hover:text-white transition-colors text-sm">My Account</a></li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="text-lg font-semibold mb-3">Newsletter</h5>
            <p className="text-gray-300 mb-3">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex flex-col sm:flex-row shadow-2xl rounded-lg overflow-hidden border-2 border-white/10">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-dark text-white placeholder-gray-500 focus:outline-none focus:bg-white/5 transition-colors min-w-0"
              />
              <button className="px-6 py-3 bg-white text-slate-dark hover:bg-slate-dark hover:text-white transition-all duration-300 font-black uppercase text-xs tracking-[0.2em]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center">
          <p className="text-gray-300">
            © 2024 MearnSneakers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
