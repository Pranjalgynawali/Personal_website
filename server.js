const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { fetchYouTubeVideos } = require('./youtube-feed');

const root = __dirname;
const port = Number(process.env.PORT) || 3000;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
};

async function handleYouTubeVideos(req, res) {
  try {
    const videos = await fetchYouTubeVideos();
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    });
    res.end(JSON.stringify(videos));
  } catch (error) {
    console.error('Unable to load YouTube videos:', error);
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Unable to load YouTube videos' }));
  }
}

function resolveRequestPath(urlPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(urlPath, 'http://localhost').pathname);
  } catch {
    return null;
  }

  if (pathname === '/') pathname = '/index.html';
  if (pathname === '/gallery' || pathname === '/gallery/') pathname = '/gallery.html';

  const filePath = path.resolve(root, `.${pathname}`);
  return filePath.startsWith(`${root}${path.sep}`) ? filePath : null;
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/youtube-videos') {
    handleYouTubeVideos(req, res);
    return;
  }

  const filePath = resolveRequestPath(req.url || '/');
  if (!filePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Website running at http://localhost:${port}`);
});
