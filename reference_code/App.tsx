
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GlobeAnimation from './components/GlobeAnimation';
import Stats from './components/Stats';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#050505] text-white">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-green-900/10 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <Hero />
        <GlobeAnimation />
      </main>

      <div className="relative z-10 w-full px-6 md:px-16 pb-12 mt-auto">
        <Stats />
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-4 cursor-pointer group hover:opacity-80 transition-opacity">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-400">SCROLL DOWN</span>
        <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default App;
