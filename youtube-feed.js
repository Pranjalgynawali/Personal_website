const CHANNEL_ID = 'UCnyWxsyiY6FbzqelWwTrcPQ';

function decodeXml(value) {
  return value
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getTagValue(entry, tagName) {
  const match = entry.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`));
  return match ? decodeXml(match[1].trim()) : '';
}

async function fetchYouTubeVideos() {
  const feedResponse = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
  );

  if (!feedResponse.ok) {
    throw new Error(`YouTube feed request failed: ${feedResponse.status}`);
  }

  const feed = await feedResponse.text();
  const videos = [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
    const entry = match[1];
    const id = getTagValue(entry, 'yt:videoId');
    const title = getTagValue(entry, 'title');
    const published = getTagValue(entry, 'published');

    return id && title ? { id, title, published } : null;
  }).filter(Boolean);

  return videos;
}

module.exports = { fetchYouTubeVideos };