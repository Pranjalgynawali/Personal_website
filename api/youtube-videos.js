const { fetchYouTubeVideos } = require('../youtube-feed');

module.exports = async function handler(_request, response) {
  try {
    const videos = await fetchYouTubeVideos();
    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    response.status(200).json(videos);
  } catch (error) {
    console.error('Unable to load YouTube videos:', error);
    response.status(502).json({ error: 'Unable to load YouTube videos' });
  }
};