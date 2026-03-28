
import React, { useMemo } from 'react';

const GlobeAnimation: React.FC = () => {
  // Generate random stats for the trading bars
  const bars = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      height: Math.random() * 60 + 20, // 20% to 80%
      delay: `${Math.random() * 4}s`,
      duration: `${3 + Math.random() * 3}s`,
    }));
  }, []);

  return (
    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] -z-10 pointer-events-none">
      {/* The Globe Base */}
      <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full globe-glow overflow-hidden bg-gradient-to-t from-green-500/20 via-transparent to-transparent">
        {/* Simplified Globe Image/Overlay */}
        <div 
          className="w-full h-full opacity-40 scale-125"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) brightness(0.5) sepia(1) hue-rotate(80deg) saturate(3)',
            maskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
          }}
        />
      </div>

      {/* Trading Bars Overlay */}
      <div className="absolute inset-0 flex items-end justify-center gap-6 px-12 pb-[100px]">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="trading-bar w-1.5 md:w-2.5 rounded-full bg-gradient-to-t from-green-500/80 to-transparent"
            style={{
              height: `${bar.height}%`,
              '--delay': bar.delay,
              '--duration': bar.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Dark Fade Overlay to blend globe with footer */}
      <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
    </div>
  );
};

export default GlobeAnimation;
