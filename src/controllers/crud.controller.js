const jwt = require("jsonwebtoken");
const noteModel = require("../models/note.model");

async function createNote(req, res) {
  const { title, description } = req.body;

  try {
    const note = await noteModel.create({
      title: title,
      description: description,
      user: req.user.id,
    });
    res.status(201).json({
      message: "Notes created successfully",
      note: note,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Unable to createNote",
    });
  }
}

async function getAllNotes(req, res) {
  try {
    const notes = await noteModel.find({
      user: req.user.id,
    });

    res.status(200).json({
      message: "Notes fetched successfully",
      notes: notes,
    });
  } catch (err) {
    res.status(401).json({
      message: "Unable to fetch notes",
    });
  }
}

async function deleteNote(req, res) {
  const noteId = req.params.id;
  const user = req.user;
  try {
    const note = await noteModel.findOne({
      _id: noteId,
      user: user.id,
    });

    if (!note) {
      res.status(404).json({
        message: "Note not found",
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Unable to delete note",
    });
  }
}

async function updateNote(req, res) {
  const { title, description } = req.body;
  const noteId = req.params.id;
  const user = req.user;
  try {
    const note = await noteModel.findOne({
      _id: noteId,
      user: user.id,
    });

    if (!note) {
      res.status(404).json({
        message: "Note not found",
      });
    }

    await note.updateOne({
      title: title,
      description: description,
    });

    res.status(200).json({
      message: "Note updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Unable to update note",
    });
  }
}

module.exports = {
  createNote,
  getAllNotes,
  deleteNote,
  updateNote,
};
