import React, { useState, useEffect, useCallback } from 'react';
import TicTacToe from './TicTacToe';
import PixelMemory from './PixelMemory';

const FreelanceClicker = ({ onComplete }) => {
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else {
            onComplete(clicks * 80); // Toned down reward slightly
        }
    }, [timeLeft, clicks]);

    return (
        <div className="text-center space-y-6 animate-fade-in max-w-sm mx-auto">
            <div className="space-y-1">
                <h3 className="text-2xl font-bold">Freelance Rush</h3>
                <p className="text-text-muted text-sm">Tap the keys to finish projects on time.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="stat-pill">
                    <span className="text-[10px] text-text-muted font-bold uppercase">Timer</span>
                    <span className="text-2xl font-bold font-mono text-secondary">{timeLeft}s</span>
                </div>
                <div className="stat-pill">
                    <span className="text-[10px] text-text-muted font-bold uppercase">Earned</span>
                    <span className="text-2xl font-bold font-mono text-success">₹{(clicks * 80).toLocaleString()}</span>
                </div>
            </div>

            <button
                onClick={() => timeLeft > 0 && setClicks(c => c + 1)}
                className="w-48 h-48 rounded-[2rem] bg-primary hover:bg-primary-hover shadow-lg text-6xl transform active:scale-95 transition-all outline-none"
            >
                ⌨️
            </button>

            <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Tap rhythmically to earn</p>
        </div>
    );
};

const NightDelivery = ({ onComplete }) => {
    const [lane, setLane] = useState(1);
    const [obstacles, setObstacles] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(25);
    const [isGameOver, setIsGameOver] = useState(false);
    const [speed, setSpeed] = useState(1);

    const spawnObstacle = useCallback(() => {
        const types = [
            { id: 'car', icon: '🚗', speed: 1.2 },
            { id: 'truck', icon: '🚛', speed: 0.8 },
            { id: 'cow', icon: '🐄', speed: 0.5 },
            { id: 'pothole', icon: '🕳️', speed: 0 },
            { id: 'cash', icon: '💰', speed: 0, isReward: true }
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        const randomLane = Math.floor(Math.random() * 3);
        setObstacles(prev => [...prev, { id: Date.now(), lane: randomLane, pos: -20, ...type }]);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0 || isGameOver) return;
        const timer = setInterval(() => {
            setTimeLeft(t => t - 1);
            setSpeed(s => Math.min(s + 0.1, 3.5));
        }, 1000);
        const spawner = setInterval(spawnObstacle, 1000 / speed);
        const mover = setInterval(() => {
            setObstacles(prev => {
                const moved = prev.map(o => ({ ...o, pos: o.pos + (3 + (o.speed || 0)) * speed }));
                const collision = moved.find(o => o.lane === lane && o.pos > 78 && o.pos < 88);
                if (collision) {
                    if (collision.isReward) {
                        setScore(s => s + 1500);
                        return moved.filter(o => o.id !== collision.id);
                    } else {
                        setIsGameOver(true);
                        return [];
                    }
                }
                const out = moved.filter(o => o.pos < 110);
                if (out.length < moved.length) setScore(s => s + 100);
                return out;
            });
        }, 30);
        return () => { clearInterval(timer); clearInterval(spawner); clearInterval(mover); };
    }, [timeLeft, isGameOver, lane, spawnObstacle, speed]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowLeft') setLane(l => Math.max(0, l - 1));
            if (e.key === 'ArrowRight') setLane(l => Math.min(2, l + 1));
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    if (isGameOver || timeLeft <= 0) {
        return (
            <div className="text-center space-y-6 animate-fade-in max-w-sm mx-auto">
                <div className="text-7xl mb-4">{isGameOver ? "💥" : "🏙️"}</div>
                <h2 className={`text-4xl font-bold uppercase ${isGameOver ? 'text-danger' : 'text-success'}`}>
                    {isGameOver ? "Crashed!" : "Tips Collected!"}
                </h2>
                <div className="glass-card py-6 border-glass-border">
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Night Shift Reward</p>
                    <div className="text-4xl font-bold font-mono">₹{score.toLocaleString()}</div>
                </div>
                <button onClick={() => onComplete(score)} className="btn-primary w-full">Claim Reward</button>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fade-in max-w-sm mx-auto">
            <div className="flex justify-between px-2">
                <div className="text-xs font-bold text-text-muted uppercase">Timer: <span className="text-secondary font-mono">{timeLeft}s</span></div>
                <div className="text-xs font-bold text-text-muted uppercase">Payout: <span className="text-success font-mono">₹{score.toLocaleString()}</span></div>
            </div>

            {/* Road Container */}
            <div className="delivery-container relative h-[420px] overflow-hidden bg-[#2b2b2b] border-x-8 border-green-800 rounded-lg shadow-inner">
                {/* Rolling Asphalt Texture Effect (Optional subtle pattern) */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(#4a4a4a 1px, transparent 1px)',
                        backgroundSize: '10px 10px'
                    }}
                />

                {/* Lane Markers */}
                <div className="absolute inset-0 flex">
                    <div className="flex-1 border-r-4 border-dashed border-white/30" />
                    <div className="flex-1 border-r-4 border-dashed border-white/30" />
                    <div className="flex-1" />
                </div>

                {/* Obstacles */}
                {obstacles.map(o => (
                    <div key={o.id} className="absolute text-5xl transform -translate-x-1/2 transition-all duration-100 z-10"
                        style={{ left: `${o.lane * 33.3 + 16.5}%`, top: `${o.pos}%` }}>
                        {o.icon}
                    </div>
                ))}

                {/* Scooter */}
                <div className="absolute bottom-10 text-6xl transform -translate-x-1/2 transition-all duration-100 z-20"
                    style={{ left: `${lane * 33.3 + 16.5}%` }}>
                    🛵
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button onMouseDown={() => setLane(l => Math.max(0, l - 1))} className="glass-card py-4 text-2xl">⬅️</button>
                <button onMouseDown={() => setLane(l => Math.min(2, l + 1))} className="glass-card py-4 text-2xl">➡️</button>
            </div>
        </div>
    );
};

const CryptoGamble = ({ currentEarnings, onComplete }) => {
    const [isGambling, setIsGambling] = useState(false);
    const [result, setResult] = useState(null);

    const startGamble = () => {
        setIsGambling(true);
        setTimeout(() => {
            const win = Math.random() > 0.5;
            setResult(win ? 'win' : 'lose');
            setIsGambling(false);
        }, 1500);
    };

    if (result) {
        return (
            <div className="text-center space-y-6 animate-fade-in max-w-sm mx-auto">
                <div className="text-7xl">{result === 'win' ? "🚀" : "📉"}</div>
                <h2 className={`text-4xl font-bold ${result === 'win' ? 'text-success' : 'text-danger'}`}>
                    {result === 'win' ? "WINNER!" : "REKT!"}
                </h2>
                <div className="glass-card py-4 bg-white/5">
                    <p className="text-xs text-text-muted uppercase mb-1">Final Payout</p>
                    <div className="text-3xl font-bold font-mono">₹{(result === 'win' ? currentEarnings * 2 : 0).toLocaleString()}</div>
                </div>
                <button onClick={() => onComplete(result === 'win' ? currentEarnings * 2 : 0)} className="btn-primary w-full">Proceed</button>
            </div>
        );
    }

    return (
        <div className="text-center space-y-8 animate-fade-in max-w-sm mx-auto">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold">Crypto Gamble</h2>
                <p className="text-text-muted text-sm">Double your hustle earnings or lose them all.</p>
            </div>

            <div className="glass-card py-8 bg-bg-surface/50 border-white/5">
                <p className="text-[10px] text-text-muted uppercase tracking-widest mb-2 font-bold">Earnings At Stake</p>
                <div className="text-5xl font-bold font-mono text-secondary tracking-tight">₹{currentEarnings.toLocaleString()}</div>
            </div>

            <div className="flex flex-col gap-3">
                <button onClick={startGamble} disabled={isGambling} className="btn-primary py-4 text-lg">
                    {isGambling ? 'Processing...' : 'Bet Everything (50/50)'}
                </button>
                <button onClick={() => onComplete(currentEarnings)} disabled={isGambling} className="text-text-muted text-sm hover:text-white transition-all underline">
                    Skip Gamble
                </button>
            </div>
        </div>
    );
};

const Minigames = ({ onComplete }) => {
    const [activeGame, setActiveGame] = useState(null);
    const [minigameEarnings, setMinigameEarnings] = useState(0);

    const handleGameEnd = (reward) => {
        const total = minigameEarnings + reward;
        setMinigameEarnings(total);
        setActiveGame('gamble-check');
    };

    if (activeGame === 'clicker') return <FreelanceClicker onComplete={handleGameEnd} />;
    if (activeGame === 'delivery') return <NightDelivery onComplete={handleGameEnd} />;
    if (activeGame === 'tictactoe') return <TicTacToe onComplete={handleGameEnd} />;
    if (activeGame === 'memory') return <PixelMemory onComplete={handleGameEnd} />;
    if (activeGame === 'gamble-check') return <CryptoGamble currentEarnings={minigameEarnings} onComplete={onComplete} />;

    return (
        <div className="animate-fade-in space-y-10 max-w-2xl mx-auto py-4">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Side Hustles</h1>
                <p className="text-text-muted">Need extra cash? Choose a gig to boost your month-end balance.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {[
                    { id: 'clicker', icon: '⌨️', title: 'Freelance Rush', desc: 'Tap keys to finish code. Low risk.', color: 'primary' },
                    { id: 'delivery', icon: '🛵', title: 'Night Delivery', desc: 'Dodge cars for tips. Medium risk.', color: 'secondary' },
                    { id: 'tictactoe', icon: '⭕', title: 'Sector Control', desc: 'Beat the AI in strategy. Skill based.', color: 'accent' },
                    { id: 'memory', icon: '🧩', title: 'Pixel Memory Quests', desc: 'Match icons to clear the dungeon. Brain power.', color: 'success' }
                ].map(game => (
                    <button
                        key={game.id}
                        onClick={() => setActiveGame(game.id)}
                        className="glass-card interactive-card flex items-center gap-6 p-6 border-white/5"
                    >
                        <div className="text-4xl p-4 bg-white/5 rounded-2xl group-hover:scale-105 transition-transform">{game.icon}</div>
                        <div className="flex-1 text-left">
                            <h3 className="text-lg font-bold">{game.title}</h3>
                            <p className="text-text-muted text-xs">{game.desc}</p>
                        </div>
                        <div className="text-primary font-bold text-xs uppercase">Play →</div>
                    </button>
                ))}
            </div>

            <button onClick={() => onComplete(0)} className="w-full text-text-muted text-xs uppercase font-bold hover:text-white transition-all underline decoration-white/20">
                Skip Hustles
            </button>
        </div>
    );
};

export default Minigames;
