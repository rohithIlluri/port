import React from 'react';
import { COMPONENT_STYLES } from '../../constants/theme';
import GitHubStats from '../github/GitHubStats';


const Sidebar = () => {
  return (
    <aside className={`w-full space-y-8 ${COMPONENT_STYLES.section.container}`}>
      <div>
        <GitHubStats />
      </div>
    </aside>
  );
};

export default Sidebar;