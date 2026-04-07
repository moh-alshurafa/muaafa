import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="معافى logo" className="h-8 md:h-12 w-auto" />
            <span className="text-xl md:text-3xl font-black text-[#0f4c5c]">معافى</span>
          </div>
          <div className="flex items-center">
            <Link
              to="/onboarding"
              className="bg-[#9dce5b] hover:bg-[#8cb851] text-[#0f4c5c] px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-sm inline-block"
            >
              ابدأ رحلتك
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
