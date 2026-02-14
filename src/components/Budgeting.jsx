import React, { useState } from 'react';

const Budgeting = ({ job, city, lifeSetup, onComplete }) => {
    const getLifeCost = () => {
        if (lifeSetup === 'family') return 15000;
        if (lifeSetup === 'pets') return 5000;
        return 0;
    };

    const [expenses, setExpenses] = useState({
        rent: city.rent,
        food: lifeSetup === 'family' ? 12000 : 5000,
        transport: 2000,
        leisure: 3000
    });

    const [customExpenses, setCustomExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ name: '', amount: '' });

    const lifeSetupCost = getLifeCost();
    const baseTotal = Object.values(expenses).reduce((a, b) => a + (Number(b) || 0), 0);
    const customTotal = customExpenses.reduce((a, b) => a + (Number(b.amount) || 0), 0);
    const totalOutgo = baseTotal + customTotal + lifeSetupCost;
    const remaining = job.salary - totalOutgo;
    const healthPercent = Math.max(0, (remaining / job.salary) * 100);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenses(prev => ({ ...prev, [name]: value }));
    };

    const addCustomExpense = () => {
        if (!newExpense.name || !newExpense.amount) return;
        setCustomExpenses([...customExpenses, { ...newExpense, id: Date.now() }]);
        setNewExpense({ name: '', amount: '' });
    };

    const removeCustomExpense = (id) => {
        setCustomExpenses(customExpenses.filter(ex => ex.id !== id));
    };

    return (
        <div className="animate-fade-in space-y-8 max-w-2xl mx-auto py-4">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Plan Your Budget</h1>
                <p className="text-text-muted">Set your expected costs for Month One.</p>
            </div>

            <div className="glass-card space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-primary uppercase">Core Costs</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-text-muted mb-1 block uppercase">Monthly Rent</label>
                                <input type="number" name="rent" value={expenses.rent} onChange={handleChange} className="premium-input" />
                            </div>
                            <div>
                                <label className="text-xs text-text-muted mb-1 block uppercase">Food & Groceries</label>
                                <input type="number" name="food" value={expenses.food} onChange={handleChange} className="premium-input" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-secondary uppercase">Lifestyle</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-text-muted mb-1 block uppercase">Transport</label>
                                <input type="number" name="transport" value={expenses.transport} onChange={handleChange} className="premium-input" />
                            </div>
                            <div>
                                <label className="text-xs text-text-muted mb-1 block uppercase">Entertainment</label>
                                <input type="number" name="leisure" value={expenses.leisure} onChange={handleChange} className="premium-input" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-glass-border">
                    <h3 className="text-sm font-bold text-accent uppercase mb-4">Other Liabilities</h3>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Expense Name (e.g. WiFi)"
                            value={newExpense.name}
                            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                            className="premium-input"
                            style={{ flex: 2 }}
                        />
                        <input
                            type="number"
                            placeholder="₹"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                            className="premium-input"
                            style={{ flex: 1 }}
                        />
                        <button onClick={addCustomExpense} className="btn-primary">Add</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {customExpenses.map((ex) => (
                            <div key={ex.id} className="stat-pill flex justify-between items-center text-sm">
                                <span>{ex.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">₹{Number(ex.amount).toLocaleString()}</span>
                                    <button onClick={() => removeCustomExpense(ex.id)} className="text-danger hover:underline text-xs">✕</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-bg-dark/40 rounded-2xl border border-glass-border">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-text-muted text-sm uppercase font-bold">Planned Monthly Inflow</span>
                        <span className="text-xl font-bold">₹{job.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-glass-border">
                        <div>
                            <span className="text-text-muted text-sm uppercase font-bold">Balance Position</span>
                            <p className="text-xs text-text-muted">Safety Cushion: {healthPercent.toFixed(0)}%</p>
                        </div>
                        <span className={`text-3xl font-bold ${remaining >= 0 ? 'text-success' : 'text-danger'}`}>
                            ₹{remaining.toLocaleString()}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => onComplete({ ...expenses, custom: customExpenses })}
                    className="btn-primary w-full"
                >
                    Begin Simulation
                </button>
            </div>
        </div>
    );
};

export default Budgeting;
