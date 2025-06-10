import express from 'express';
const router = express.Router();

// Contoh endpoint checklist
router.get('/', (req, res) => {
  res.json([
    { id: 1, nama: 'Checklist 1', status: 'done' },
    { id: 2, nama: 'Checklist 2', status: 'pending' }
  ]);
});

router.post('/', (req, res) => {
  // Tambah checklist baru
  res.json({ message: 'Checklist berhasil ditambahkan' });
});

router.get('/:id', (req, res) => {
  // Detail checklist
  res.json({ id: req.params.id, nama: 'Checklist 1', status: 'done' });
});

router.put('/:id', (req, res) => {
  // Update checklist
  res.json({ message: 'Checklist berhasil diupdate' });
});

router.delete('/:id', (req, res) => {
  // Hapus checklist
  res.json({ message: 'Checklist berhasil dihapus' });
});

export default router;