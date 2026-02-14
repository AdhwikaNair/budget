import React from 'react';
import { cities } from '../data/cityData';

const CitySelection = ({ onSelect, job }) => {
    return (
        <div className="animate-fade-in space-y-8 py-4">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Pick Your City</h1>
                <p className="text-text-muted max-w-md mx-auto">
                    Your salary is <span className="text-success font-bold">₹{job.salary.toLocaleString()}</span>.
                    Choose a city that fits your budget.
                </p>
            </div>

            <div className="grid-responsive">
                {cities.map((city) => {
                    const baseCost = city.rent + city.food + city.transport + city.leisure;
                    const burden = (baseCost / job.salary) * 100;

                    let difficulty = "Livable";
                    let diffClass = "text-success bg-success/10";
                    if (burden > 70) {
                        difficulty = "Difficult";
                        diffClass = "text-danger bg-danger/10";
                    } else if (burden > 45) {
                        difficulty = "Moderate";
                        diffClass = "text-warning bg-warning/10";
                    }

                    return (
                        <div
                            key={city.name}
                            onClick={() => onSelect(city)}
                            className="glass-card interactive-card space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className="text-5xl">{city.icon}</div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${diffClass}`}>
                                    {difficulty}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">{city.name}</h3>
                                <p className="text-text-muted text-sm mt-1">{city.description}</p>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-glass-border">
                                <div className="flex justify-between text-xs">
                                    <span className="text-text-muted">Avg. Rent</span>
                                    <span className="font-bold">₹{city.rent.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-text-muted">Est. Expenses</span>
                                    <span className="font-bold">₹{baseCost.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="w-full bg-bg-dark h-1.5 rounded-full overflow-hidden mt-2">
                                <div
                                    className={`h-full transition-all duration-1000 ${burden > 70 ? 'bg-danger' : burden > 45 ? 'bg-warning' : 'bg-success'}`}
                                    style={{ width: `${Math.min(burden, 100)}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CitySelection;
