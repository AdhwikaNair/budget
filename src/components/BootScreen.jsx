import React from 'react';

const BootScreen = ({ onStart }) => {
    return (
        <div className="fixed inset-0 z-[9999] crt-screen flex flex-col items-center justify-center font-pixel crt-flicker">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: 'url(/mainbg.jpg)' }}
            />

            {/* Overlay Gradient for Readability */}
            <div className="absolute inset-0 bg-black/40 z-1" />

            {/* Scanlines layer */}
            <div className="crt-scanlines z-10" />

            {/* Main Content */}
            <div className="relative z-20 flex flex-col items-center justify-between h-full py-20">
                {/* Top decorative text */}
                <div className="text-[#00f3ff] neon-cyan text-sm tracking-[0.5em] font-bold opacity-80 animate-pulse">
                    SYSTEM_BOOT // V.2049
                </div>

                {/* Center Action */}
                <div className="mt-auto mb-20">
                    <button
                        onClick={onStart}
                        className="group relative px-16 py-6 bg-black/60 border-4 border-[#00f3ff] text-[#00f3ff] text-3xl font-bold tracking-widest hover:bg-[#00f3ff]/10 hover:border-[#ff00ff] hover:text-[#ff00ff] transition-all duration-300 neon-cyan hover:neon-magenta"
                    >
                        <span className="relative z-10 glitch-effect" data-text="PRESS START">PRESS START</span>
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-[#ff00ff] text-xs tracking-widest opacity-70 animate-pulse neon-magenta">
                            INITIALIZING NEURAL LINK...
                        </p>
                    </div>
                </div>
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-30" />
        </div>
    );
};

export default BootScreen;
