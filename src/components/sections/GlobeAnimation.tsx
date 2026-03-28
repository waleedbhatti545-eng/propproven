"use client"

import React from 'react';

const GlobeAnimation: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Main Globe Container - Positioned at bottom center, extending below viewport */}
            <div className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[150%] md:w-[120%] lg:w-[100%] aspect-square max-w-[1400px]">

                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-brand-red/20 via-brand-red/5 to-transparent blur-3xl animate-pulse" />

                {/* Globe Base with Red Glow */}
                <div
                    className="absolute inset-[5%] rounded-full overflow-hidden"
                    style={{
                        boxShadow: `
              0 0 100px rgba(255, 50, 0, 0.4),
              0 0 200px rgba(255, 50, 0, 0.2),
              0 0 300px rgba(255, 50, 0, 0.1),
              inset 0 0 100px rgba(255, 50, 0, 0.3)
            `,
                    }}
                >
                    {/* Globe Image with Red Filter */}
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center top',
                            filter: 'grayscale(100%) brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(3)',
                        }}
                    />

                    {/* Red Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-red/40 via-brand-red/20 to-transparent mix-blend-overlay" />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-radial from-brand-red/30 via-transparent to-transparent" />
                </div>

                {/* Atmospheric Haze */}
                <div className="absolute inset-[3%] rounded-full border border-brand-red/10 bg-gradient-to-t from-brand-red/5 to-transparent" />

            </div>

            {/* Top Fade to blend with header */}
            <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-dark-bg via-dark-bg/80 to-transparent" />

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent" />

            {/* Side Fades */}
            <div className="absolute top-0 left-0 w-[100px] h-full bg-gradient-to-r from-dark-bg to-transparent" />
            <div className="absolute top-0 right-0 w-[100px] h-full bg-gradient-to-l from-dark-bg to-transparent" />
        </div>
    );
};

export default GlobeAnimation;
