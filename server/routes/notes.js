import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

/**
 * GET /api/notes
 * Retrieve all notes, sorted by newest first
 */
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

/**
 * POST /api/notes
 * Create a new note on the wall
 */
router.post('/', async (req, res) => {
  try {
    const { message, name, font } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const note = new Note({
      message: message.trim(),
      name: name?.trim() || 'Anonymous',
      font: font?.trim() || 'Caveat',
    });
    
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create note' });
  }
});

/**
 * DELETE /api/notes/:id
 * Remove a note from the wall (optional, for future use)
 */
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

/**
 * PUT /api/notes/:id
 * Update a note on the wall
 */
router.put('/:id', async (req, res) => {
  try {
    const { message, name, font } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const updateData = {
      message: message.trim(),
      name: name?.trim() || 'Anonymous',
    };
    
    // Only update font if provided
    if (font) {
      updateData.font = font.trim();
    }
    
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update note' });
  }
});

export default router;
