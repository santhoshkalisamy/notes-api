const express = require('express');
const noteController = require('../controllers/notes');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, noteController.createNote);
router.get('/', auth, noteController.getNotes);
router.get('/:id', auth, noteController.getNoteById);
router.put('/:id', auth, noteController.updateNote);
router.delete('/:id', auth, noteController.deleteNote);

module.exports = router;
