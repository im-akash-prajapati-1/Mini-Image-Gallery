const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const images = [];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPEG and PNG allowed'));
    }
    cb(null, true);
  }
}).single('image');

// POST
app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Max 3MB.' });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Only JPEG and PNG files are allowed.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Upload error.' });
    }

    if (!req.file) return res.status(400).json({ error: 'No file provided.' });

    const id = uuidv4();
    const item = {
      id,
      filename: req.file.originalname,
      mimeType: req.file.mimetype,
      buffer: req.file.buffer
    };
    images.unshift(item);

    const b64 = item.buffer.toString('base64');
    const dataUrl = `data:${item.mimeType};base64,${b64}`;
    res.json({
      id: item.id,
      filename: item.filename,
      mimeType: item.mimeType,
      dataUrl
    });
  });
});

// GET 
app.get('/images', (req, res) => {
  const out = images.map(img => ({
    id: img.id,
    filename: img.filename,
    mimeType: img.mimeType,
    dataUrl: `data:${img.mimeType};base64,${img.buffer.toString('base64')}`
  }));
  res.json(out);
});

// DELETE
app.delete('/images/:id', (req, res) => {
  const id = req.params.id;
  const idx = images.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Image not found.' });
  images.splice(idx, 1);
  res.json({ success: true, id });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
