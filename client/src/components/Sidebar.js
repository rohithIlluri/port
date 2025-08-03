import React from 'react';
import GitHubStats from './GitHubStats';

const Sidebar = () => {
  return (
    <aside className="w-full space-y-8">
      <GitHubStats />
    </aside>
  );
};

export default Sidebar;