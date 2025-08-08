import React from 'react';
import Reveal from '../ui/Reveal';
import GitHubStats from '../github/GitHubStats';

const Sidebar = () => {
  return (
    <aside className="w-full space-y-8">
      <Reveal delay={50}>
        <GitHubStats />
      </Reveal>
    </aside>
  );
};

export default Sidebar;