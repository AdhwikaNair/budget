import React, { useState } from 'react';
import { lifeEvents } from '../data/eventData';

const MonthSimulation = ({ onComplete }) => {
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [customEvent, setCustomEvent] = useState({ title: '', amount: '', category: 'challenge' });

    const opportunities = lifeEvents.filter(e => e.category === 'opportunity');
    const challenges = lifeEvents.filter(e => e.category === 'challenge');

    const toggleEvent = (event) => {
        if (selectedEvents.find(e => e.id === event.id)) {
            setSelectedEvents(prev => prev.filter(e => e.id !== event.id));
        } else {
            setSelectedEvents(prev => [...prev, event]);
        }
    };

    const addCustomEvent = () => {
        if (!customEvent.title || !customEvent.amount) return;
        const newEvent = {
            id: Date.now(),
            ...customEvent,
            amount: customEvent.category === 'challenge' ? -Math.abs(Number(customEvent.amount)) : Math.abs(Number(customEvent.amount)),
            type: customEvent.category === 'opportunity' ? 'positive' : 'negative',
            icon: customEvent.category === 'opportunity' ? '✨' : '💸',
            description: "User Entry"
        };
        setSelectedEvents(prev => [...prev, newEvent]);
        setCustomEvent({ title: '', amount: '', category: 'challenge' });
    };

    const challengesSelected = selectedEvents.filter(e => e.category === 'challenge').length;
    const isValid = challengesSelected >= 2;

    return (
        <div className="animate-fade-in space-y-8 max-w-4xl mx-auto py-4 pb-20">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Monthly Ledger</h1>
                <p className="text-text-muted">Record the setbacks and wins of the month.</p>
                <div className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${isValid ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {isValid ? 'Ready to Finalize' : `Need ${2 - challengesSelected} more challenges`}
                </div>
            </div>

            <div className="glass-card bg-bg-surface/50">
                <h3 className="text-sm font-bold text-primary uppercase mb-4">Add Custom Record</h3>
                <div className="flex flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Description"
                        className="flex-1 min-w-[180px] premium-input"
                        value={customEvent.title}
                        onChange={(e) => setCustomEvent({ ...customEvent, title: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-24 premium-input"
                        value={customEvent.amount}
                        onChange={(e) => setCustomEvent({ ...customEvent, amount: e.target.value })}
                    />
                    <select
                        className="premium-input w-32 bg-bg-surface"
                        value={customEvent.category}
                        onChange={(e) => setCustomEvent({ ...customEvent, category: e.target.value })}
                    >
                        <option value="challenge">Liability</option>
                        <option value="opportunity">Windfall</option>
                    </select>
                    <button onClick={addCustomEvent} className="btn-primary">Add</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LOG BOOK */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-glass-border pb-2">
                        <h4 className="font-bold text-success text-sm uppercase">Extra Income</h4>
                    </div>

                    <div className="space-y-3">
                        {selectedEvents.filter(e => e.type === 'positive').map(event => (
                            <div key={event.id} className="stat-pill border-l-4 border-success flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{event.icon}</span>
                                    <div className="text-xs">
                                        <p className="font-bold">{event.title}</p>
                                        <p className="text-text-muted">{event.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono font-bold text-success">₹{event.amount.toLocaleString()}</p>
                                    <button onClick={() => setSelectedEvents(prev => prev.filter(e => e.id !== event.id))} className="text-[10px] text-danger font-bold hover:underline">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 opacity-70 hover:opacity-100 transition-opacity">
                        {opportunities.map(event => !selectedEvents.find(se => se.id === event.id) && (
                            <button key={event.id} onClick={() => toggleEvent(event)} className="w-full text-left p-3 rounded-lg border border-glass-border hover:border-success/30 hover:bg-success/5 transition-all flex justify-between items-center">
                                <span className="text-sm"><span className="mr-2">{event.icon}</span> {event.title}</span>
                                <span className="font-mono text-xs font-bold text-success">+₹{event.amount.toLocaleString()}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* LIABILITIES */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-glass-border pb-2">
                        <h4 className="font-bold text-danger text-sm uppercase">Life Challenges</h4>
                    </div>

                    <div className="space-y-3">
                        {selectedEvents.filter(e => e.type === 'negative').map(event => (
                            <div key={event.id} className="stat-pill border-l-4 border-danger flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{event.icon}</span>
                                    <div className="text-xs">
                                        <p className="font-bold">{event.title}</p>
                                        <p className="text-text-muted">{event.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono font-bold text-danger">-₹{Math.abs(event.amount).toLocaleString()}</p>
                                    <button onClick={() => setSelectedEvents(prev => prev.filter(e => e.id !== event.id))} className="text-[10px] text-danger font-bold hover:underline">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 opacity-70 hover:opacity-100 transition-opacity">
                        {challenges.map(event => !selectedEvents.find(se => se.id === event.id) && (
                            <button key={event.id} onClick={() => toggleEvent(event)} className="w-full text-left p-3 rounded-lg border border-glass-border hover:border-danger/30 hover:bg-danger/5 transition-all flex justify-between items-center">
                                <span className="text-sm"><span className="mr-2">{event.icon}</span> {event.title}</span>
                                <span className="font-mono text-xs font-bold text-danger">-₹{Math.abs(event.amount).toLocaleString()}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg p-6 z-50">
                <button
                    onClick={() => isValid && onComplete(selectedEvents)}
                    disabled={!isValid}
                    className="btn-primary w-full py-4 text-lg shadow-xl"
                >
                    {isValid ? 'Finalize Ledger' : 'Record More Challenges'}
                </button>
            </div>
        </div>
    );
};

export default MonthSimulation;
