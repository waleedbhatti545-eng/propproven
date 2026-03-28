
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-24 flex items-center justify-between px-6 md:px-16 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
          <div className="w-6 h-6 border-4 border-black border-r-transparent rounded-full" />
        </div>
        <span className="text-xl font-bold tracking-tighter">JCTRADER</span>
      </div>

      {/* Center Nav (Glass Pill) */}
      <div className="hidden lg:flex items-center gap-8 px-8 py-3 glass-card rounded-full text-sm font-medium text-gray-300">
        <a href="#" className="hover:text-white transition-colors">Markets</a>
        <a href="#" className="hover:text-white transition-colors">Platforms</a>
        <a href="#" className="hover:text-white transition-colors">About Us</a>
        <a href="#" className="hover:text-white transition-colors">Partnerships</a>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-gray-300 cursor-pointer hover:text-white">
          <img src="https://flagcdn.com/w20/us.png" alt="English" className="w-5 h-3.5 object-cover rounded-sm" />
          <span>English</span>
          <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <button className="px-6 py-2.5 rounded-lg border border-gray-700 text-sm font-medium hover:bg-white/5 transition-colors">
          Login
        </button>
        
        <button className="px-6 py-2.5 rounded-lg bg-[#95FF21] text-black text-sm font-bold hover:bg-[#82e01a] transition-all transform hover:scale-105">
          Trade Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
