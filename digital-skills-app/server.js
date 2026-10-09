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

app.get('/api/lessons/:id', (req, res) => {
  const { id } = req.params;
  if (!ID_PATTERN.test(id)) {
    return res.status(400).json({ error: 'invalid lesson id' });
  }
  const file = path.join(CONTENT, 'lessons', `${id}.json`);
  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: 'lesson not found' });
  }
  res.json(readJson(file));
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Digital Skills app listening on port ${PORT}`);
});
