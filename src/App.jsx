import React, { useState, useRef, useEffect } from 'react';
import JobAssignment from './components/JobAssignment';
import CitySelection from './components/CitySelection';
import Budgeting from './components/Budgeting';
import Minigames from './components/Minigames';
import MonthSimulation from './components/MonthSimulation';
import SurvivalDashboard from './components/SurvivalDashboard';
import BootScreen from './components/BootScreen';
import BackgroundMusic from './components/BackgroundMusic';

function App() {
  const audioRef = useRef(null);
  const [hasBooted, setHasBooted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameState, setGameState] = useState('job');
  const [userData, setUserData] = useState({
    name: '',
    avatar: '',
    job: null,
    city: null,
    lifeSetup: 'single',
    expenses: null,
    events: [],
    rewards: 0
  });

  const handleJobComplete = ({ name, avatar, job, lifeSetup }) => {
    setUserData(prev => ({ ...prev, name, avatar, job, lifeSetup }));
    setGameState('city');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCitySelect = (city) => {
    setUserData(prev => ({ ...prev, city }));
    setGameState('budget');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBudgetComplete = (expenses) => {
    setUserData(prev => ({ ...prev, expenses }));
    setGameState('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulationComplete = (events) => {
    setUserData(prev => ({ ...prev, events }));
    setGameState('minigame');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMinigameComplete = (reward) => {
    setUserData(prev => ({ ...prev, rewards: reward }));
    setGameState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setGameState('job');
    setUserData({ name: '', avatar: '', job: null, city: null, lifeSetup: 'single', expenses: null, events: [], rewards: 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleClick = () => {
      if (!isMuted) {
        const audio = new Audio('/mouseclick.wav');
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Click SFX blocked:", e));
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isMuted]);

  const handleBoot = () => {
    setHasBooted(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <BackgroundMusic ref={audioRef} isMuted={isMuted} />
      {!hasBooted && <BootScreen onStart={handleBoot} />}

      <div className={`h-screen w-screen overflow-hidden font-pixel relative select-none transition-opacity duration-1000 ${hasBooted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Desktop Wallpaper with Grid */}
        <div className="desktop-bg" />

        {/* Desktop Icons (Decoration) */}
        <div className="absolute top-10 left-10 flex flex-col gap-10 opacity-90 pointer-events-none">
          <div className="flex flex-col items-center gap-1 group">
            <div className="text-4xl filter drop-shadow-pixel-sm">💻</div>
            <span className="text-[11px] font-bold text-os-text bg-white/50 px-2 border-2 border-os-border/10 rounded-sm">My System</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-4xl filter drop-shadow-pixel-sm">📁</div>
            <span className="text-[11px] font-bold text-os-text bg-white/50 px-2 border-2 border-os-border/10 rounded-sm">Games</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto h-[calc(100vh-40px)] flex flex-col justify-center px-4 relative z-10">
          {/* Main Application Window */}
          <div className="os-window flex flex-col max-h-[90vh] animate-boot">
            {/* Title Bar */}
            <div className="os-title-bar">
              <span>SYS: BUDGET.EXE_v1.0</span>
              <div className="os-title-actions">
                <button className="os-btn-action">_</button>
                <button className="os-btn-action">□</button>
                <button className="os-btn-action bg-secondary/10">X</button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-8 bg-os-window custom-scrollbar">
              <main className="animate-slide-up">
                {gameState === 'job' && (
                  <JobAssignment onComplete={handleJobComplete} />
                )}

                {gameState === 'city' && (
                  <CitySelection onSelect={handleCitySelect} job={userData.job} />
                )}
                {gameState === 'budget' && (
                  <Budgeting
                    job={userData.job}
                    city={userData.city}
                    lifeSetup={userData.lifeSetup}
                    onComplete={handleBudgetComplete}
                  />
                )}

                {gameState === 'simulation' && (
                  <MonthSimulation onComplete={handleSimulationComplete} />
                )}

                {gameState === 'minigame' && (
                  <Minigames onComplete={handleMinigameComplete} />
                )}

                {gameState === 'result' && (
                  <SurvivalDashboard userData={userData} onRestart={handleRestart} />
                )}
              </main>
            </div>
          </div>
        </div>

        {/* Retro Taskbar */}
        <footer className="taskbar">
          <button className="start-btn">
            <span className="text-sm">💾</span>
            <span>START</span>
          </button>
          <div className="h-full w-[1px] bg-os-border/20 mx-2"></div>
          <div className="flex flex-1 gap-2 items-center overflow-hidden">
            <div className="px-3 h-7 bg-bg-surface border-2 border-os-border text-[9px] font-bold flex items-center gap-2 max-w-[150px] truncate shadow-os-pressed">
              <span>📂</span> Budget.exe
            </div>
          </div>
          <div className="h-full w-[1px] bg-os-border/20 mx-2"></div>
          <div className="flex items-center gap-3 px-3 h-7 border-2 border-os-border bg-os-window shadow-os-pressed">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="hover:bg-os-text/10 p-0.5 rounded transition-colors flex items-center gap-1"
              title={isMuted ? "Unmute" : "Mute"}
            >
              <span className="text-xs">{isMuted ? '🔈' : '🔊'}</span>
            </button>
            <div className="w-[1px] h-3 bg-os-border/20"></div>
            <div className="text-[9px] font-bold tabular-nums">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
