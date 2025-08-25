import React, { memo } from 'react';
import { COMPONENT_STYLES, FONT_SIZES } from '../../constants/theme';

const Music = () => {
  return (
    <section id="music" className={COMPONENT_STYLES.section.base} aria-label="Music section">
      <div className={COMPONENT_STYLES.section.container}>
        <h2 className={COMPONENT_STYLES.section.heading}>Music</h2>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Music Card 1 */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
              HZ
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-sm">Hans Zimmer</h3>
              <p className="text-gray-600 text-xs">THE GOAT</p>
            </div>
          </div>

          {/* Music Card 2 */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
              KC
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-sm">Katherine C</h3>
              <p className="text-gray-600 text-xs">Plays beautiful covers on piano</p>
            </div>
          </div>

          {/* Music Card 3 */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
              JP
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-sm">Jacob's Piano</h3>
              <p className="text-gray-600 text-xs">Plays beautiful covers on piano</p>
            </div>
          </div>

          {/* Music Card 4 */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
              NM
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-sm">Nathen Mills</h3>
              <p className="text-gray-600 text-xs">Plays beautiful covers on guitar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Music);
