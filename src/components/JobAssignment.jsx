import React, { useState, useEffect } from 'react';
import { jobs } from '../data/jobData';

const avatars = ["👨‍💻", "👩‍🎨", "👨‍🔬", "👩‍💼", "👨‍🍳", "👩‍🎤", "👨‍🚀", "👩‍🚒"];

const JobAssignment = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(avatars[0]);
    const [lifeSetup, setLifeSetup] = useState('single');
    const [currentJob, setCurrentJob] = useState(null);
    const [isInstalling, setIsInstalling] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);

    const logMessages = [
        "Initializing CareerRegistry.sys...",
        "Allocating sectors for UserID...",
        "Validating system credentials...",
        "Bypassing logic gates...",
        "Finalizing sector placement...",
        "Registration complete."
    ];

    const handleInstall = () => {
        if (!name.trim()) return;
        setIsInstalling(true);
        setLogs([]);

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
                    setCurrentJob(randomJob);
                    setStep(2);
                    setIsInstalling(false);
                }, 500);
            }
            setProgress(currentProgress);

            const logIdx = Math.floor((currentProgress / 100) * logMessages.length);
            if (logMessages[logIdx] && !logs.includes(logMessages[logIdx])) {
                setLogs(prev => [...prev, logMessages[logIdx]]);
            }
        }, 150);
    };

    return (
        <div className="flex flex-col h-full font-pixel animate-fade-in text-os-text">
            {isInstalling ? (
                <div className="flex-1 flex flex-col justify-center items-center p-8 space-y-10 animate-boot">
                    <div className="text-8xl animate-pixel-bounce">💾</div>

                    <div className="w-full max-w-md bg-secondary border-4 border-os-border shadow-pixel-md overflow-hidden">
                        <div className="bg-secondary/20 p-2 border-b-4 border-os-border flex justify-between items-center px-4">
                            <span className="text-sm font-bold uppercase tracking-widest">Loading...</span>
                            <div className="flex gap-1">
                                <span className="w-3 h-3 bg-os-border"></span>
                                <span className="w-3 h-3 bg-os-border"></span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4 bg-os-window">
                            <div className="flex justify-between text-xs font-bold uppercase mb-1">
                                <span>Installation Progress</span>
                                <span>{progress}%</span>
                            </div>
                            {/* Segmented Progress Bar */}
                            <div className="h-10 w-full border-4 border-os-border bg-white p-1.5 flex gap-1 shadow-pixel-inner">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-full flex-1 transition-colors duration-200 border-r-2 border-os-border/10 last:border-r-0
                                            ${i < Math.floor(progress / 5) ? 'bg-[#5da0ff]' : 'bg-transparent'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-md h-28 bg-white border-4 border-os-border p-3 overflow-y-auto text-[10px] font-bold font-mono shadow-pixel-inner leading-relaxed">
                        {logs.map((log, i) => (
                            <div key={i} className="animate-slide-up">LOG_ID_{742 + i}: {log}</div>
                        ))}
                    </div>
                </div>
            ) : step === 1 ? (
                <div className="flex flex-col h-full">
                    <div className="border-b-4 border-os-border/20 pb-6 mb-8">
                        <h2 className="text-4xl font-bold flex items-center gap-4">
                            <span className="w-12 h-12 bg-primary border-4 border-os-border flex items-center justify-center text-2xl shadow-pixel-sm">👤</span>
                            SET USER IDENTITY
                        </h2>
                        <p className="text-xs font-bold text-os-text/60 mt-2 uppercase tracking-tight">IDENTITY_MODULE_v2.4 - READY FOR INPUT</p>
                    </div>

                    <div className="flex-1 space-y-10">
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-os-text/70 flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary"></span>
                                Visual Interface Identity
                            </label>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                                {avatars.map((a, i) => (
                                    <button
                                        key={a}
                                        onClick={() => setAvatar(a)}
                                        className={`aspect-square text-3xl border-4 transition-all animate-slide-up flex items-center justify-center
                                            ${avatar === a
                                                ? 'bg-accent border-os-border shadow-os-pressed translate-x-[2px] translate-y-[2px]'
                                                : 'bg-white border-os-border shadow-os-beveled hover:bg-os-bg hover:translate-y-[-2px]'
                                            }`}
                                        style={{ animationDelay: `${i * 0.05}s` }}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-os-text/70 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-secondary"></span>
                                    Registry Name Allocation
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter System Alias..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="premium-input w-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t-4 border-os-border/20 pt-8 mt-10 flex justify-end">
                        <button
                            onClick={handleInstall}
                            disabled={!name.trim()}
                            className="btn-primary group"
                        >
                            <span>INSTALL IDENTITY</span>
                            <span className="ml-3 group-hover:translate-x-2 transition-transform">➡</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full animate-boot">
                    <div className="border-b-4 border-os-border/20 pb-6 mb-8">
                        <h2 className="text-4xl font-bold flex items-center gap-4">
                            <span className="w-12 h-12 bg-success/20 border-4 border-os-border flex items-center justify-center text-2xl shadow-pixel-sm">✅</span>
                            REGISTRATION SUCCESS
                        </h2>
                    </div>

                    <div className="flex-1 space-y-10">
                        <div className="bg-primary/10 border-4 border-os-border p-8 shadow-pixel-md flex flex-col md:flex-row items-center gap-8 animate-heart-beat">
                            <div className="text-8xl bg-white border-4 border-os-border p-6 shadow-pixel-inner">
                                {currentJob.icon}
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">Assigned System Sector</p>
                                <h3 className="text-5xl font-bold leading-tight">{currentJob.title}</h3>
                                <p className="text-sm font-bold text-os-text/50 uppercase">Access Code: 0x4FB_{currentJob.id}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="stat-pill p-8">
                                <p className="text-xs font-bold text-os-text/60 uppercase tracking-widest mb-3">Resource Allocation</p>
                                <p className="text-4xl font-bold text-os-text">₹{currentJob.salary.toLocaleString()}<span className="text-sm text-os-text/50 ml-2">/MO</span></p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-xs font-bold text-os-text/70 uppercase flex items-center gap-2">
                                    <span className="w-2 h-2 bg-secondary"></span>
                                    Family Node Configuration
                                </p>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { id: 'single', label: 'Single Processor' },
                                        { id: 'family', label: 'Family Cluster' },
                                        { id: 'pets', label: 'Animal Sub-modules' }
                                    ].map(setup => (
                                        <button
                                            key={setup.id}
                                            onClick={() => setLifeSetup(setup.id)}
                                            className={`p-4 border-4 text-xs font-bold transition-all text-left uppercase
                                                ${lifeSetup === setup.id
                                                    ? 'bg-secondary border-os-border shadow-os-pressed translate-x-2'
                                                    : 'bg-white border-os-border shadow-os-beveled hover:bg-secondary/10 hover:translate-x-1'}`}
                                        >
                                            {setup.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t-4 border-os-border/20 pt-8 mt-10 flex justify-end">
                        <button
                            onClick={() => onComplete({ name, avatar, job: currentJob, lifeSetup })}
                            className="btn-primary group"
                        >
                            <span>BOOT INTO ENVIRONMENT</span>
                            <span className="ml-3 group-hover:translate-x-2 transition-transform">➡</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobAssignment;
