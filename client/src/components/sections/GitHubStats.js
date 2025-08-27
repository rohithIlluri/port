import React, { memo, useState, useEffect } from 'react';
import { COMPONENT_STYLES } from '../../constants/theme';

const GitHubStats = ({ contributions = [] }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Debug: Log the contributions data
  console.log('GitHubStats received contributions:', contributions.length, 'days');
  if (contributions.length > 0) {
    console.log('Sample contribution:', contributions[0]);
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate contribution grid data
  const generateContributionGrid = () => {
    const today = new Date();
    const grid = [];
    const months = [];
    
    // Determine weeks to show based on screen size
    let weeksToShow;
    if (isMobile) {
      weeksToShow = 12; // Mobile: show last 12 weeks
    } else if (window.innerWidth < 1024) {
      weeksToShow = 20; // Tablet: show last 20 weeks (reduced from 26)
    } else {
      weeksToShow = 53; // Desktop: show full year
    }
    
    for (let week = weeksToShow - 1; week >= 0; week--) {
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
      
      // Add month labels at appropriate intervals (every 4 weeks)
      if (week % 4 === 0 || week === weeksToShow - 1) {
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
  
  // Get contribution level color
  const getContributionColor = (count) => {
    if (count === 0) return 'bg-[#ebedf0]';
    if (count === 1) return 'bg-[#9be9a8]';
    if (count === 2) return 'bg-[#40c463]';
    if (count === 3) return 'bg-[#30a14e]';
    return 'bg-[#216e39]';
  };

  // Get appropriate sizing based on screen width
  const getGridConfig = () => {
    if (isMobile) {
      return {
        itemSize: 'w-2.5 h-2.5',
        spacing: 'space-x-0.5 space-y-0.5',
        monthSpacing: 'w-8'
      };
    } else if (window.innerWidth < 1024) {
      return {
        itemSize: 'w-2.5 h-2.5',
        spacing: 'space-x-0.5 space-y-0.5',
        monthSpacing: 'w-10'
      };
    } else {
      return {
        itemSize: 'w-3 h-3',
        spacing: 'space-x-1 space-y-1',
        monthSpacing: 'w-16'
      };
    }
  };

  const config = getGridConfig();

  return (
    <section className={COMPONENT_STYLES.section.base} aria-label="GitHub stats section">
      <div className={COMPONENT_STYLES.section.container}>
        <h2 className={COMPONENT_STYLES.section.heading}>Github Stats</h2>
        
        {/* Contribution Graph Container */}
        <div className="mb-4 w-full overflow-hidden">
          {/* Month Labels Row */}
          <div className="flex mb-3 w-full">
            {months.map((month, index) => (
              <div key={index} className={`${config.monthSpacing} text-center`}>
                <span className="text-xs text-gray-600 font-medium">
                  {month}
                </span>
              </div>
            ))}
          </div>
          
          {/* Contribution Grid */}
          <div className="flex w-full">
            {grid.map((week, weekIndex) => (
              <div key={weekIndex} className={`flex flex-col ${config.spacing}`}>
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`${config.itemSize} rounded-sm transition-colors duration-200 ${
                      day.isToday 
                        ? 'ring-2 ring-blue-500 ring-offset-1' 
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
            {totalContributions} contributions in the last {
              isMobile ? '12 weeks' : 
              window.innerWidth < 1024 ? '20 weeks' : 'year'
            }
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className={`${config.itemSize} bg-[#ebedf0] rounded-sm`}></div>
              <div className={`${config.itemSize} bg-[#9be9a8] rounded-sm`}></div>
              <div className={`${config.itemSize} bg-[#40c463] rounded-sm`}></div>
              <div className={`${config.itemSize} bg-[#30a14e] rounded-sm`}></div>
              <div className={`${config.itemSize} bg-[#216e39] rounded-sm`}></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(GitHubStats);
