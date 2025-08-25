import React, { memo, useState, useEffect } from 'react';
import { COMPONENT_STYLES, FONT_SIZES } from '../../constants/theme';
import { MUSIC_ARTISTS } from '../../constants/spotify';
import { fetchArtistData, getArtistImageUrl } from '../../utils/spotify';

const Music = () => {
  const [artistsData, setArtistsData] = useState({});

  useEffect(() => {
    const fetchArtistsData = async () => {
      const data = {};
      for (const artist of MUSIC_ARTISTS) {
        data[artist.id] = await fetchArtistData(artist.id);
        console.log(`Artist ${artist.name} data:`, data[artist.id]);
      }
      setArtistsData(data);
      console.log('All artists data:', data);
    };

    fetchArtistsData();
  }, []);

  const handleArtistClick = (spotifyUrl) => {
    window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="music" className={COMPONENT_STYLES.section.base} aria-label="Music section">
      <div className={COMPONENT_STYLES.section.container}>
        <h2 className={COMPONENT_STYLES.section.heading}>Music</h2>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MUSIC_ARTISTS.map((artist) => {
            const artistData = artistsData[artist.id];
            const imageUrl = artistData && artistData.images && artistData.images.length > 0 ? getArtistImageUrl(artistData, 'small') : null;
            
            return (
              <div 
                key={artist.id}
                onClick={() => handleArtistClick(artist.spotifyUrl)}
                className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer group"
              >
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={`${artist.name} poster`}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                    onError={(e) => {
                      console.log('Image failed to load:', imageUrl);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    onLoad={(e) => {
                      console.log('Image loaded successfully:', imageUrl);
                    }}
                  />
                ) : null}
                <div className={`w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold ${imageUrl ? 'hidden' : 'flex'}`}>
                  {artist.initials}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-black text-sm">{artist.name}</h3>
                  <p className="text-gray-600 text-xs">{artist.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Music);
