import React, { memo, useEffect, useState } from 'react';
import { COMPONENT_STYLES } from '../../constants/theme';

const GitHubStats = () => {
  // Generate mock contribution data for 1 year
  const generateMockContributions = () => {
    const contributions = [];
    const today = new Date('2025-08-27T09:31:00-05:00'); // Current date and time (CDT)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // 52 weeks ago

    for (let day = 0; day < 365; day++) { // Generate for 365 days to cover padding
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      // Simulate realistic contribution patterns
      let count = 0;
      if (isWeekend) {
        const rand = Math.random();
        if (rand > 0.6) count = Math.floor(Math.random() * 2) + 1; // 1-2
        else if (rand > 0.9) count = 3;
      } else {
        const rand = Math.random();
        if (rand > 0.4) count = Math.floor(Math.random() * 3) + 1; // 1-3
        else if (rand > 0.85) count = Math.floor(Math.random() * 3) + 4; // 4-6
        else if (rand > 0.95) count = Math.floor(Math.random() * 4) + 7; // 7-10
      }

      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
      });
    }

    return contributions;
  };

  const contributions = generateMockContributions();

  // Generate contribution grid data
  const generateContributionGrid = () => {
    const today = new Date('2025-08-27T09:31:00-05:00');
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // 52 weeks ago

    // Align to previous Sunday (JS getDay: 0=Sun)
    const daysToSunday = startDate.getDay();
    const gridStartDate = new Date(startDate);
    gridStartDate.setDate(gridStartDate.getDate() - daysToSunday);

    const grid = [];
    const months = [];

    for (let week = 0; week < 53; week++) { // Explicitly loop for 53 weeks
      const weekStart = new Date(gridStartDate);
      weekStart.setDate(gridStartDate.getDate() + week * 7);

      const weekData = [];
      let weekHasValidData = false;

      for (let day = 0; day < 7; day++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + day);

        if (date > today) {
          weekData.push({
            date: date.toISOString().split('T')[0],
            count: 0,
            isToday: false,
          });
        } else {
          const contribution = contributions.find(c => c.date === date.toISOString().split('T')[0]) || {
            date: date.toISOString().split('T')[0],
            count: 0,
          };

          weekData.push({
            date: contribution.date,
            count: contribution.count,
            isToday: date.toDateString() === today.toDateString(),
          });
        }

        weekHasValidData = true;
      }

      if (weekData.length > 0 && weekHasValidData) {
        grid.push(weekData);
      }

      // Month labels approximately every 4 weeks
      if (week % 4 === 0 || week === 0) {
        months.push(weekStart.toLocaleDateString('en-US', { month: 'short' }));
      } else {
        months.push('');
      }
    }

    return { grid, months, startDate };
  };

  // Determine if mobile based on Tailwind's sm breakpoint (640px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let { grid, months, startDate } = generateContributionGrid();
  if (isMobile) {
    grid = grid.reverse();
    months = months.reverse();
  }

  // Calculate total contributions for displayed period
  const totalContributions = contributions
    .filter(c => {
      const date = new Date(c.date);
      return date >= startDate && date <= new Date('2025-08-27T09:31:00-05:00');
    })
    .reduce((sum, c) => sum + c.count, 0);

  // GitHub's exact contribution colors
  const getContributionColor = (count) => {
    if (count === 0) return 'bg-[#ebedf0]'; // No contributions
    if (count <= 2) return 'bg-[#9be9a8]'; // Light green
    if (count <= 5) return 'bg-[#40c463]'; // Medium green
    if (count <= 8) return 'bg-[#30a14e]'; // Dark green
    return 'bg-[#216e39]'; // Darkest green
  };

  return (
    <section className={`${COMPONENT_STYLES.section.base} py-4`} aria-label="GitHub stats section">
      <div className={COMPONENT_STYLES.section.container}>
        <h2 className={`${COMPONENT_STYLES.section.heading} mb-3 text-lg`}>GitHub Contributions</h2>

        {/* Contribution Graph */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className={`min-w-[${(grid.length * 10) + ((grid.length - 1) * 3)}px]`}>
            {/* Month Labels */}
            <div className="flex mb-1 text-xs text-gray-500 font-medium">
              {months.map((month, index) => (
                <span key={index} className="text-center w-[calc(100%/13)]">
                  {month}
                </span>
              ))}
            </div>

            {/* Contribution Grid */}
            <div className="flex space-x-[2px] sm:space-x-[3px]">
              {grid.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col space-y-[2px] sm:space-y-[3px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-[2px] transition-colors duration-200 ${
                        day.isToday
                          ? 'ring-1 sm:ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2'
                          : getContributionColor(day.count)
                      }`}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Count */}
          <div className="mt-3 text-xs text-gray-600">
            {totalContributions} contribution{totalContributions !== 1 ? 's' : ''} in the last year
          </div>

          {/* Legend */}
          <div className="mt-2 flex items-center space-x-2 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-[#ebedf0] rounded-[2px]"></div>
              <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-[#9be9a8] rounded-[2px]"></div>
              <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-[#40c463] rounded-[2px]"></div>
              <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-[#30a14e] rounded-[2px]"></div>
              <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-[#216e39] rounded-[2px]"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(GitHubStats);