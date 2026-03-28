
import React from 'react';

interface StatItemProps {
  label: string;
  value: string;
  subLabel: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, subLabel }) => (
  <div className="flex flex-col gap-1">
    <span className="text-3xl font-bold tracking-tighter">{value}</span>
    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
      {subLabel}
    </span>
  </div>
);

const Stats: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-opacity">
      <StatItem 
        label="Minimum Deposit" 
        value="100+" 
        subLabel="Minimum Deposit" 
      />
      <StatItem 
        label="Trading Leverage" 
        value="1500" 
        subLabel="Trading Leverage" 
      />
      <StatItem 
        label="Starting Form 0.0" 
        value="SPREAD" 
        subLabel="Starting Form 0.0" 
      />
    </div>
  );
};

export default Stats;
