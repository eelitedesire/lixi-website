import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const DATA_DIR = './data';
const UPLOAD_DIR = path.join(__dirname, '../public/images/uploads');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const getFilePath = (resource) => path.join(DATA_DIR, `${resource}.json`);

const readData = (resource) => {
  try {
    return JSON.parse(fs.readFileSync(getFilePath(resource), 'utf8'));
  } catch {
    return [];
  }
};

const writeData = (resource, data) => {
  fs.writeFileSync(getFilePath(resource), JSON.stringify(data, null, 2));
};

app.post('/api/upload', (req, res) => {
  try {
    const { image, filename } = req.body;
    if (!image || !filename) {
      return res.status(400).json({ error: 'Missing image or filename' });
    }
    
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filepath = path.join(UPLOAD_DIR, filename);
    
    fs.writeFileSync(filepath, buffer);
    res.json({ url: `/images/uploads/${filename}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const translateObject = (obj, lang = 'en') => {
  const translated = { ...obj };
  Object.keys(obj).forEach(key => {
    if (key.match(/_(en|fr|es|nl)$/)) {
      const baseField = key.replace(/_(en|fr|es|nl)$/, '');
      const langField = `${baseField}_${lang}`;
      const fallbackField = `${baseField}_en`;
      if (!translated[baseField]) {
        translated[baseField] = obj[langField] || obj[fallbackField] || obj[key];
      }
    }
  });
  return translated;
};

app.get('/api/admin/:resource/list', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData(req.params.resource);
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.post('/api/admin/:resource/create', (req, res) => {
  const data = readData(req.params.resource);
  data.push({ ...req.body, createdAt: Date.now() });
  writeData(req.params.resource, data);
  res.json({ success: true });
});

app.post('/api/admin/:resource/update', (req, res) => {
  const data = readData(req.params.resource);
  const index = data.findIndex(item => item.id === req.body.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body, updatedAt: Date.now() };
  } else {
    data.push({ ...req.body, createdAt: Date.now() });
  }
  writeData(req.params.resource, data);
  res.json({ success: true });
});

app.post('/api/admin/:resource/delete', (req, res) => {
  const data = readData(req.params.resource);
  const filtered = data.filter(item => item.id !== req.body.id && item.slug !== req.body.id);
  writeData(req.params.resource, filtered);
  res.json({ success: true });
});

// Public API endpoints with language support
app.get('/api/products', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('products');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/blog', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('blog');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/hero', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('hero');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/celltech', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('celltech');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/whatwedo', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('whatwedo');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/partners', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('partners');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/solutions', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('solutions');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/services', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('services');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/footer', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('footer');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/about', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('about');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/video', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('video');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/shopping', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('shopping');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/projects', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData('projects');
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/:resource', (req, res) => {
  const lang = req.query.lang || 'en';
  const data = readData(req.params.resource);
  const translated = data.map(item => translateObject(item, lang));
  res.json(translated);
});

app.get('/api/orders', (req, res) => {
  res.json(readData('orders'));
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
