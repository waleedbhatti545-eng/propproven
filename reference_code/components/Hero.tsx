
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center max-w-4xl mx-auto z-20 mt-12 mb-8">
      {/* Trustpilot Badge */}
      <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Excellent</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-4 h-4 bg-[#00B67A] flex items-center justify-center">
              <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                <path d="M10 1L13 7L19 8L15 13L16 19L10 16L4 19L5 13L1 8L7 7L10 1Z" />
              </svg>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-[#00B67A] fill-current" viewBox="0 0 20 20">
            <path d="M10 1L13 7L19 8L15 13L16 19L10 16L4 19L5 13L1 8L7 7L10 1Z" />
          </svg>
          <span className="text-[10px] font-bold text-white tracking-wider">Trustpilot</span>
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
        Redefining the <br />
        <span className="text-glow">Future of Trading</span>
      </h1>
      
      <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
        Access Forex, Indices, Commodities, Metals, Equities, and Cryptos. 
        Industry-recognized regulated broker.
      </p>

      <button className="px-10 py-4 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-white/10">
        Trade Now
      </button>
    </div>
  );
};

export default Hero;
