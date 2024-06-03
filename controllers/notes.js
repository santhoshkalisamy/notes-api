const { Note } = require('../models');

exports.createNote = async (req, res) => {
    try {
        const note = await Note.create({ ...req.body, userId: req.user.id });
        res.status(201).send(note);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({ where: { userId: req.user.id } });
        res.send(notes);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });
        if (!note) {
            return res.status(404).send({ error: 'Note not found' });
        }
        res.send(note);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!note) {
            return res.status(404).send();
        }
        await note.update(req.body);
        res.send(note);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!note) {
            return res.status(404).send();
        }
        await note.destroy();
        res.send(note);
    } catch (err) {
        res.status(500).send(err);
    }
};
