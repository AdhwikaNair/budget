import React, { useEffect, useState } from 'react';

const SurvivalDashboard = ({ userData, onRestart }) => {
    const { name, avatar, job, city, lifeSetup, expenses, events, rewards } = userData;

    const getLifeCost = () => {
        if (lifeSetup === 'family') return 15000;
        if (lifeSetup === 'pets') return 5000;
        return 0;
    };

    const lifeSetupCost = getLifeCost();
    const baseExpensesTotal = (Number(expenses.rent) || 0) + (Number(expenses.food) || 0) + (Number(expenses.transport) || 0) + (Number(expenses.leisure) || 0);
    const customExpensesTotal = (expenses.custom || []).reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const totalOutgo = baseExpensesTotal + customExpensesTotal + lifeSetupCost;
    const eventImpact = events.reduce((acc, curr) => acc + curr.amount, 0);
    const actualFinalBalance = job.salary - totalOutgo + eventImpact + (rewards || 0);

    const getStatus = () => {
        if (actualFinalBalance > 25000) return { label: "TYCOON", color: "text-accent", msg: "Master of the city. You've secured a massive fortune this month." };
        if (actualFinalBalance > 8000) return { label: "THRIVING", color: "text-success", msg: "Strategic win! You survived with a solid financial cushion." };
        if (actualFinalBalance >= 0) return { label: "SURVIVED", color: "text-warning", msg: "Barely made it! You cleared the month but funds are tight." };
        return { label: "BANKRUPT", color: "text-danger", msg: "The city budget crushed you. Debt is piling up." };
    };

    const status = getStatus();

    return (
        <div className="animate-fade-in space-y-8 max-w-3xl mx-auto py-4 pb-20">
            <div className="text-center space-y-2">
                <p className="text-text-muted font-bold text-[10px] uppercase tracking-[0.2em]">End of Month One</p>
                <h1 className={`text-6xl font-black ${status.color}`}>
                    {status.label}
                </h1>
                <p className="text-text-muted italic text-sm font-medium">"{status.msg}"</p>
            </div>

            <div className="glass-card p-0 overflow-hidden border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    <div className="p-6 text-center bg-success/5">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Cash Inflow</p>
                        <p className="text-3xl font-bold font-mono text-success">₹{(job.salary + (rewards || 0)).toLocaleString()}</p>
                    </div>
                    <div className="p-6 text-center bg-danger/5">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Total Outgo</p>
                        <p className="text-3xl font-bold font-mono text-danger">₹{totalOutgo.toLocaleString()}</p>
                    </div>
                    <div className="p-6 text-center bg-white/5">
                        <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Net Balance</p>
                        <p className={`text-3xl font-bold font-mono ${actualFinalBalance >= 0 ? 'text-success' : 'text-danger'}`}>
                            ₹{actualFinalBalance.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-primary uppercase border-b border-primary/20 pb-1">Expense Summary</h4>
                            <div className="space-y-3">
                                {[
                                    { label: 'Core Rent', val: expenses.rent },
                                    { label: 'Groceries/Supplies', val: expenses.food },
                                    { label: 'Life Setup', val: lifeSetupCost },
                                    ...((expenses.custom || []).map(ex => ({ label: ex.name, val: ex.amount })))
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs">
                                        <span className="text-text-muted">{item.label}</span>
                                        <span className="font-mono font-bold">₹{Number(item.val).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-secondary uppercase border-b border-secondary/20 pb-1">Life Events</h4>
                            <div className="space-y-3">
                                {events.length > 0 ? events.map(event => (
                                    <div key={event.id} className="flex justify-between items-center text-xs">
                                        <span className="text-text-main flex items-center gap-2">
                                            <span>{event.icon}</span> {event.title}
                                        </span>
                                        <span className={`font-mono font-bold ${event.amount >= 0 ? 'text-success' : 'text-danger'}`}>
                                            {event.amount >= 0 ? '+' : '-'}₹{Math.abs(event.amount).toLocaleString()}
                                        </span>
                                    </div>
                                )) : (
                                    <p className="text-center py-2 text-[10px] text-text-muted uppercase font-bold">No significant events</p>
                                )}
                                {(rewards || 0) > 0 && (
                                    <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                                        <span className="text-xs font-bold text-secondary">Minigame Reward</span>
                                        <span className="font-mono font-bold text-secondary">+₹{rewards.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Legacy Record</p>
                            <p className="text-lg font-bold">
                                {avatar} {name} • <span className="text-primary italic">{job.title}</span> in {city.name}
                            </p>
                        </div>
                        <button onClick={onRestart} className="btn-primary">Restart Journey</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurvivalDashboard;
