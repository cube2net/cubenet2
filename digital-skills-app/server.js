const express = require('express');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CONTENT = path.join(ROOT, 'content');
const PORT = process.env.PORT || 3000;
const ID_PATTERN = /^[a-z0-9-]+$/i;

const app = express();
app.disable('x-powered-by');

app.use(express.static(path.join(ROOT, 'public')));
app.use('/media', express.static(path.join(CONTENT, 'media')));

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

app.get('/api/curriculum', (req, res) => {
  res.json(readJson(path.join(CONTENT, 'curriculum.json')));
});

// School details printed on worksheets (content/school.json, editable without rebuilding).
app.get('/api/school', (req, res) => {
  const file = path.join(CONTENT, 'school.json');
  const school = fs.existsSync(file) ? readJson(file) : {};
  // Drop the logo when its file has not been added yet, so the page shows the fallback mark.
  if (school.logo && school.logo.startsWith('/media/')) {
    const logo = path.join(CONTENT, 'media', path.normalize(school.logo.slice('/media/'.length)));
    if (!logo.startsWith(path.join(CONTENT, 'media')) || !fs.existsSync(logo)) delete school.logo;
  }
  res.json(school);
});

app.get('/api/lessons/:id', (req, res) => {
  const { id } = req.params;
  if (!ID_PATTERN.test(id)) {
    return res.status(400).json({ error: 'invalid lesson id' });
  }
  const file = path.join(CONTENT, 'lessons', `${id}.json`);
  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: 'lesson not found' });
  }
  const lesson = readJson(file);
  // Teacher-chosen YouTube links live in content/videos.json so lesson files stay untouched.
  const videos = path.join(CONTENT, 'videos.json');
  if (fs.existsSync(videos)) {
    const url = readJson(videos)[id];
    if (typeof url === 'string' && url.trim()) lesson.video = url.trim();
  }
  res.json(lesson);
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Digital Skills app listening on port ${PORT}`);
});
