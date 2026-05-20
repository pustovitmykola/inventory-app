const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

let inventory = [];
if (fs.existsSync(DB_FILE)) {
  inventory = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

const saveToDB = () => {
  fs.writeFileSync(DB_FILE, JSON.stringify(inventory, null, 2));
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// GET всі позиції
app.get('/inventory', (req, res) => {
  res.json(inventory);
});

// GET одна позиція
app.get('/inventory/:id', (req, res) => {
  const item = inventory.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// GET фото - редірект
app.get('/inventory/:id/photo', (req, res) => {
  const item = inventory.find(i => i.id === req.params.id);
  if (!item || !item.photo) return res.status(404).json({ error: 'No photo' });
  res.redirect(item.photo);
});

// POST створити
app.post('/register', upload.single('photo'), (req, res) => {
  const { inventory_name, description } = req.body;
  if (!inventory_name) return res.status(400).json({ error: 'inventory_name is required' });
  const newItem = {
    id: Date.now().toString(),
    inventory_name,
    description: description || '',
    photo: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : '',
  };
  inventory.push(newItem);
  saveToDB();
  res.status(201).json(newItem);
});

// PUT оновити текст
app.put('/inventory/:id', (req, res) => {
  const idx = inventory.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const { inventory_name, description } = req.body;
  inventory[idx] = { ...inventory[idx], inventory_name, description };
  saveToDB();
  res.json(inventory[idx]);
});

// PUT оновити фото
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const idx = inventory.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  if (req.file) {
    inventory[idx].photo = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    saveToDB();
  }
  res.json(inventory[idx]);
});

// DELETE видалити
app.delete('/inventory/:id', (req, res) => {
  const idx = inventory.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  inventory.splice(idx, 1);
  saveToDB();
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
