import React from 'react';
import GitHubStats from './GitHubStats';

const Sidebar = () => {
  return (
    <aside className="w-full xl:w-96 space-y-6">
      <GitHubStats />
    </aside>
  );
};

export default Sidebar;