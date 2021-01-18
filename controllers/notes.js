import Note from "../models/note";
import User from "../models/user";
const createNote = (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400).send({ message: "Title and content cannot be empty!" });
    return;
  }
  const username = req.params.username;
  User.findOne({
    username: username
  })
    .exec((err, user) => {
      const note = new Note({
        title: req.body.title,
        content: req.body.content,
        userId: user._id
      });
      note
        .save(note)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the note."
          });
        });
    });
};
//deuxiéme partie
const updateNote = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update note with id=${id}. Note was not found!`
          });
        } else
          res.send({ message: "Note was updated successfully!" });
      })
      .catch(err => {
        res.status(500).send({
          message: `Error occurred while updating note with id=${id}.`
        });
      });
  };
  const deleteNote = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete note with id=${id}. Note was not found!`
          });
        } else {
          res.send({
            message: "Note was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete note with id=${id}.`
        });
      });
  };