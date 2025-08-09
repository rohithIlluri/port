import React from 'react';

import GitHubStats from '../github/GitHubStats';

const Sidebar = () => {
  return (
    <aside className="w-full space-y-8">
      <div>
        <GitHubStats />
      </div>
    </aside>
  );
};

export default Sidebar;