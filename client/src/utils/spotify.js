import { SPOTIFY_CONFIG, SPOTIFY_ENDPOINTS } from '../constants/spotify';

// Direct artist image URLs (fallback when API is not available)
// Using reliable image URLs that will actually display
const ARTIST_IMAGES = {
  '0YC192cP3KPCRWx8zr8MfZ': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face&auto=format', // Hans Zimmer - composer
  '3WrFJ7ztbogyGnTHbHJFl2': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face&auto=format', // The Beatles - music
  '1mYsTxnqsietFxj1OgoGbG': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face&auto=format', // A.R. Rahman - music
  '6XyY86QOPPrYVGvF9ch6wz': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face&auto=format', // Linkin Park - rock
};

// Alternative approach: Use a more reliable image service
const getArtistImageFallback = (artistId) => {
  const artistNames = {
    '0YC192cP3KPCRWx8zr8MfZ': 'hans+zimmer+composer',
    '3WrFJ7ztbogyGnTHbHJFl2': 'the+beatles+band',
    '1mYsTxnqsietFxj1OgoGbG': 'ar+rahman+composer',
    '6XyY86QOPPrYVGvF9ch6wz': 'linkin+park+band'
  };
  
  const searchTerm = artistNames[artistId] || 'music+artist';
  return `https://source.unsplash.com/200x200/?${searchTerm}`;
};

// Guaranteed working fallback images
const getGuaranteedImage = (artistId) => {
  // Use a simple, reliable image service
  return `https://picsum.photos/200/200?random=${artistId}`;
};

// Get Spotify access token (you'll need to implement OAuth flow)
export const getSpotifyAccessToken = async () => {
  // For now, return null - you'll need to implement OAuth
  // This is a placeholder for the actual OAuth implementation
  return null;
};

// Fetch artist data from Spotify
export const fetchArtistData = async (artistId) => {
  try {
    const token = await getSpotifyAccessToken();
    
    if (!token) {
      // Return fallback data with guaranteed working image URLs
      const fallbackUrl = getGuaranteedImage(artistId);
      console.log(`Using guaranteed fallback image for ${artistId}:`, fallbackUrl);
      return {
        id: artistId,
        name: 'Artist',
        images: [{ url: fallbackUrl }],
        external_urls: { spotify: 'https://open.spotify.com' }
      };
    }

    const response = await fetch(`${SPOTIFY_ENDPOINTS.ARTIST}/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch artist data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching artist data:', error);
    // Return fallback data with guaranteed working image URLs
    const fallbackUrl = getGuaranteedImage(artistId);
    console.log(`Using guaranteed fallback image for ${artistId} after error:`, fallbackUrl);
    return {
      id: artistId,
      name: 'Artist',
      images: [{ url: fallbackUrl }],
      external_urls: { spotify: 'https://open.spotify.com' }
    };
  }
};

// Get artist image URL
export const getArtistImageUrl = (artistData, size = 'medium') => {
  if (!artistData || !artistData.images || artistData.images.length === 0) {
    console.log('No images found in artist data:', artistData);
    return null;
  }

  const imageUrl = artistData.images[0].url;
  console.log(`Getting image URL for artist ${artistData.id}:`, imageUrl);

  // Return appropriate image size
  if (size === 'small' && artistData.images.length > 1) {
    return artistData.images[1].url; // Second image is usually smaller
  }
  
  return imageUrl; // First image is usually the largest
};
