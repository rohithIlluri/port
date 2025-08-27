import React, { memo } from 'react';
import { COMPONENT_STYLES } from '../../constants/theme';

const GitHubStats = ({ contributions = [] }) => {
  // Generate contribution grid data for the last year
  const generateContributionGrid = () => {
    const today = new Date();
    const grid = [];
    const months = [];
    
    // Generate data for the last 53 weeks (GitHub shows 53 weeks)
    for (let week = 52; week >= 0; week--) {
      const weekData = [];
      let weekDate;
      
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (week * 7 + day));
        
        // Store the first day of the week for month labels
        if (day === 0) {
          weekDate = date;
        }
        
        // Find contribution count for this date
        const contribution = contributions.find(c => c.date === date.toISOString().split('T')[0]);
        const count = contribution ? contribution.count : 0;
        
        weekData.push({
          date: date.toISOString().split('T')[0],
          count,
          isToday: date.toDateString() === today.toDateString()
        });
      }
      grid.push(weekData);
      
      // Track month labels (show months at appropriate intervals)
      if (week % 4 === 0 || week === 52) {
        months.push(weekDate.toLocaleDateString('en-US', { month: 'short' }));
      } else {
        months.push('');
      }
    }
    
    return { grid, months: months.reverse() };
  };

  const { grid, months } = generateContributionGrid();
  
  // Calculate total contributions
  const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);
  
  // Get contribution level color (matching GitHub's exact colors)
  const getContributionColor = (count) => {
    if (count === 0) return 'bg-[#ebedf0]'; // GitHub's light gray
    if (count === 1) return 'bg-[#9be9a8]'; // GitHub's light green
    if (count === 2) return 'bg-[#40c463]'; // GitHub's medium green
    if (count === 3) return 'bg-[#30a14e]'; // GitHub's dark green
    return 'bg-[#216e39]'; // GitHub's darkest green
  };

  return (
    <section className={COMPONENT_STYLES.section.base} aria-label="GitHub stats section">
      <div className={COMPONENT_STYLES.section.container}>
        <h2 className={COMPONENT_STYLES.section.heading}>Github Stats</h2>
        
        {/* Contribution Graph */}
        <div className="mb-4 overflow-x-auto">
          {/* Month Labels */}
          <div className="flex justify-between mb-2 text-xs text-gray-600 min-w-max">
            {months.map((month, index) => (
              <span key={index} className="w-8 sm:w-12 text-center">
                {month}
              </span>
            ))}
          </div>
          
          {/* Contribution Grid */}
          <div className="flex space-x-0.5 sm:space-x-1 min-w-max">
            {grid.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-0.5 sm:space-y-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm transition-colors duration-200 ${
                      day.isToday 
                        ? 'ring-1 sm:ring-2 ring-blue-500 ring-offset-0 sm:ring-offset-1' 
                        : getContributionColor(day.count)
                    }`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Contribution Count */}
          <div className="mt-4 text-sm text-gray-600">
            {totalContributions} contributions in the last year
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center space-x-2 sm:space-x-4 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex space-x-0.5 sm:space-x-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#ebedf0] rounded-sm"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#9be9a8] rounded-sm"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#40c463] rounded-sm"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#30a14e] rounded-sm"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#216e39] rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(GitHubStats);
