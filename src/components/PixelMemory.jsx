import React, { useState, useEffect } from 'react';

// --- Pixel Art Icons (Inline SVGs) ---
// These components render 16x16 pixel art using SVG rects for a crisp look.

const PixelCardBack = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
        <rect width="16" height="16" fill="#2d3748" />
        <rect x="2" y="2" width="12" height="12" fill="#4a5568" />
        <rect x="4" y="4" width="8" height="8" fill="#2d3748" />
        <path d="M6 6h4v4h-4z" fill="#718096" />
        <path d="M7 7h2v2h-2z" fill="#a0aec0" />
    </svg>
);

const PixelHeart = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full text-red-500" shapeRendering="crispEdges">
        <path d="M4 4h3v1h-3zM9 4h3v1h-3zM3 5h5v1h-5zM9 5h4v1h-4zM2 6h12v3h-12zM3 9h10v1h-10zM4 10h8v1h-8zM5 11h6v1h-6zM6 12h4v1h-4zM7 13h2v1h-2z" fill="currentColor" />
    </svg>
);

const PixelPotion = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full text-blue-400" shapeRendering="crispEdges">
        <path d="M7 2h2v1h-2zM6 3h4v1h-4zM7 4h2v2h-2zM6 6h4v1h-4zM5 7h6v2h-6zM4 9h8v4h-8zM5 13h6v1h-6z" fill="currentColor" />
        <rect x="6" y="9" width="2" height="2" fill="white" opacity="0.5" />
    </svg>
);

const PixelCoin = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full text-yellow-400" shapeRendering="crispEdges">
        <path d="M6 3h4v1h-4zM4 4h2v1h-2zM10 4h2v1h-2zM3 5h1v6h-1zM12 5h1v6h-1zM4 11h2v1h-2zM10 11h2v1h-2zM6 12h4v1h-4z" fill="currentColor" />
        <rect x="7" y="6" width="2" height="4" fill="#B7791F" />
    </svg>
);

const PixelSword = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full text-gray-300" shapeRendering="crispEdges">
        <path d="M12 2h2v2h-2zM10 4h2v2h-2zM8 6h2v2h-2zM6 8h2v2h-2zM4 10h2v2h-2zM3 12h1v2h-1zM1 12h2v1h-2zM2 13h1v2h-1z" fill="currentColor" />
        <path d="M12 2h2v2h-2z" fill="#E2E8F0" />
        <path d="M2 13h2v2h-2z" fill="#744210" />
    </svg>
);

const PixelGhost = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full text-purple-300" shapeRendering="crispEdges">
        <path d="M6 3h4v1h-4zM4 4h8v1h-8zM3 5h10v6h-10zM3 11h1v1h-1zM5 11h2v1h-2zM9 11h2v1h-2zM13 11h1v1h-1zM4 12h1v1h-1zM8 12h1v1h-1zM12 12h1v1h-1z" fill="currentColor" />
        <rect x="5" y="6" width="2" height="2" fill="#1A202C" />
        <rect x="9" y="6" width="2" height="2" fill="#1A202C" />
    </svg>
);

const PixelSlime = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full text-green-400" shapeRendering="crispEdges">
        <path d="M7 5h2v1h-2zM5 6h6v1h-6zM4 7h8v1h-8zM3 8h10v4h-10zM4 12h8v1h-8zM5 13h6v1h-6z" fill="currentColor" />
        <rect x="5" y="8" width="1" height="2" fill="#1A202C" />
        <rect x="10" y="8" width="1" height="2" fill="#1A202C" />
    </svg>
);

const PixelChest = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full text-orange-700" shapeRendering="crispEdges">
        <path d="M4 5h8v1h-8zM3 6h10v1h-10zM2 7h12v6h-12zM3 13h10v1h-10zM4 14h8v1h-8z" fill="currentColor" />
        <rect x="7" y="8" width="2" height="2" fill="#F6E05E" />
        <path d="M2 7h1v6h-1zM13 7h1v6h-1z" fill="#744210" />
    </svg>
);

const PixelMushroom = () => (
    <svg viewBox="0 0 16 16" className="w-full h-full text-red-600" shapeRendering="crispEdges">
        <path d="M6 4h4v1h-4zM4 5h8v1h-8zM3 6h10v3h-10zM2 9h12v1h-12z" fill="currentColor" />
        <path d="M6 10h4v3h-4zM5 13h6v1h-6z" fill="#FED7D7" />
        <rect x="5" y="6" width="2" height="2" fill="white" />
        <rect x="10" y="7" width="1" height="1" fill="white" />
    </svg>
);

// --- Game Logic ---

const ICON_TYPES = [
    { name: 'heart', component: PixelHeart },
    { name: 'potion', component: PixelPotion },
    { name: 'coin', component: PixelCoin },
    { name: 'sword', component: PixelSword },
    { name: 'ghost', component: PixelGhost },
    { name: 'slime', component: PixelSlime },
    { name: 'chest', component: PixelChest },
    { name: 'mushroom', component: PixelMushroom },
];

export default function App({ onComplete }) {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [gridSize, setGridSize] = useState(4); // 4x4 Grid

    // Initialize Game
    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        // Duplicate icons to create pairs
        const gameIcons = [...ICON_TYPES, ...ICON_TYPES];

        // Shuffle
        const shuffledCards = gameIcons
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({
                id: index,
                type: icon.name,
                Component: icon.component,
                isFlipped: false,
                isMatched: false,
            }));

        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setGameWon(false);
    };

    const handleCardClick = (id) => {
        // Prevent clicking if game won, card already flipped/matched, or 2 cards already flipped
        if (
            gameWon ||
            flippedCards.length >= 2 ||
            matchedCards.includes(cards[id].type) ||
            cards[id].isFlipped
        ) {
            return;
        }

        // Flip the card
        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        // Check match if 2 cards are flipped
        if (newFlippedCards.length === 2) {
            setMoves((prev) => prev + 1);
            const [firstId, secondId] = newFlippedCards;

            if (newCards[firstId].type === newCards[secondId].type) {
                // Match found
                setMatchedCards((prev) => [...prev, newCards[firstId].type]);
                setFlippedCards([]);

                // Check win condition
                if (matchedCards.length + 1 === ICON_TYPES.length) {
                    setGameWon(true);
                }
            } else {
                // No match - delay then flip back
                setTimeout(() => {
                    const resetCards = [...newCards];
                    resetCards[firstId].isFlipped = false;
                    resetCards[secondId].isFlipped = false;
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    // Handle Game Completion / Exit
    const handleExit = () => {
        if (onComplete) {
            onComplete(gameWon ? 500 : 0); // Award 500 points for winning, 0 for exiting early
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-mono flex flex-col items-center justify-center p-4 select-none">

            {/* Import Pixel Font */}
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .pixel-font { font-family: 'Press Start 2P', cursive; }
          .pixel-shadow { box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.5); }
          .pixel-border { 
            box-shadow: 
              inset 2px 2px 0px 0px #ffffff40,
              inset -2px -2px 0px 0px #00000040,
              4px 4px 0px 0px #000000;
          }
          .card-inner {
            transition: transform 0.3s;
            transform-style: preserve-3d;
          }
          .card-front, .card-back {
            backface-visibility: hidden;
          }
          .card-front {
            transform: rotateY(180deg);
          }
          .flipped {
            transform: rotateY(180deg);
          }
        `}
            </style>

            {/* Header */}
            <div className="mb-8 text-center space-y-4">
                <h1 className="text-3xl md:text-4xl text-yellow-400 pixel-font mb-6 tracking-widest text-shadow-sm">
                    PIXEL MEMORY
                </h1>

                <div className="flex justify-center gap-8 pixel-font text-xs md:text-sm">
                    <div className="bg-gray-800 p-4 border-2 border-gray-600 pixel-border">
                        <p className="text-gray-400 mb-1">MOVES</p>
                        <p className="text-xl">{moves}</p>
                    </div>
                    <div className="bg-gray-800 p-4 border-2 border-gray-600 pixel-border">
                        <p className="text-gray-400 mb-1">PAIRS</p>
                        <p className="text-xl">{matchedCards.length}/{ICON_TYPES.length}</p>
                    </div>
                </div>
            </div>

            {/* Game Grid */}
            <div className="relative">
                <div className={`grid grid-cols-4 gap-3 md:gap-4 p-4 bg-gray-800 border-4 border-gray-700 rounded-lg pixel-shadow`}>
                    {cards.map((card, index) => (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(index)}
                            className={`
                relative w-16 h-16 md:w-20 md:h-20 cursor-pointer perspective-1000 group
                ${card.isMatched ? 'opacity-50' : 'opacity-100'}
                transition-opacity duration-500
              `}
                        >
                            <div className={`w-full h-full relative card-inner transition-transform duration-300 ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}>
                                {/* Back of Card */}
                                <div className="absolute w-full h-full card-back bg-indigo-900 border-2 border-indigo-700 pixel-border flex items-center justify-center">
                                    <div className="w-10 h-10 md:w-12 md:h-12 opacity-50">
                                        <PixelCardBack />
                                    </div>
                                </div>

                                {/* Front of Card */}
                                <div className={`
                  absolute w-full h-full card-front bg-gray-700 border-2 
                  ${card.isMatched ? 'border-yellow-500 bg-gray-800' : 'border-gray-500'} 
                  pixel-border flex items-center justify-center
                `}>
                                    <div className="w-10 h-10 md:w-12 md:h-12 animate-pulse-slow">
                                        <card.Component />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Victory Modal Overlay */}
                {gameWon && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                        <div className="text-center p-6 bg-gray-800 border-4 border-yellow-500 pixel-shadow max-w-xs animate-bounce-slow">
                            <h2 className="text-2xl text-yellow-400 pixel-font mb-4">VICTORY!</h2>
                            <p className="text-gray-300 font-mono mb-6">
                                You cleared the dungeon in <span className="text-white font-bold">{moves}</span> moves.
                            </p>
                            <button
                                onClick={handleExit}
                                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white pixel-font text-xs border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
                            >
                                CLAIM REWARD
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Controls */}
            <div className="mt-8 flex gap-4">
                <button
                    onClick={initializeGame}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 pixel-font text-xs border-b-4 border-gray-900 active:border-b-0 active:translate-y-1 transition-all"
                >
                    RESET GAME
                </button>
                <button
                    onClick={() => onComplete(0)}
                    className="px-6 py-3 bg-red-700 hover:bg-red-600 text-gray-200 pixel-font text-xs border-b-4 border-red-900 active:border-b-0 active:translate-y-1 transition-all"
                >
                    EXIT
                </button>
            </div>

        </div>
    );
}
