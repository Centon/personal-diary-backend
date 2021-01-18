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