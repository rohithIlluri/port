import React, { memo } from 'react';
import { COMPONENT_STYLES, FONT_SIZES } from '../../constants/theme';

const FavoriteMovies = () => {
  return (
    <section id="favorite-movies" className={COMPONENT_STYLES.section.base} aria-label="Favorite Movies section">
      <div className={COMPONENT_STYLES.section.container}>
        <h2 className={COMPONENT_STYLES.section.heading}>Favorite Movies</h2>
        <p className="text-black/70 text-sm mb-6">
          Movies beyond the mainstream.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Movie Card 1 */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
              IN
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-sm">Inception</h3>
              <p className="text-gray-600 text-xs">Mind-bending sci-fi thriller</p>
            </div>
          </div>

          {/* Movie Card 2 */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
              TD
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-sm">The Dark Knight</h3>
              <p className="text-gray-600 text-xs">Epic superhero masterpiece</p>
            </div>
          </div>

          {/* Movie Card 3 */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
              IN
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-sm">Interstellar</h3>
              <p className="text-gray-600 text-xs">Space exploration epic</p>
            </div>
          </div>

          {/* Movie Card 4 */}
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
              PF
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-sm">Pulp Fiction</h3>
              <p className="text-gray-600 text-xs">Quentin Tarantino classic</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(FavoriteMovies);
