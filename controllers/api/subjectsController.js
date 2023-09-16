import subjects from "../../models/subject.js";

const readSubjects = (req, res) => {
  subjects.find()
  .populate('classroom', 'professor')
  .exec((err, subjects) => {
    res.status(200).json(subjects);
  });
};

const readSubjectById = (req, res) => {
  const id = req.params.id;

  subjects.findById(id)
  .populate('classroom', 'professor')
  .exec((err, subjects) => {
    if (err) {
      res
        .status(400)
        .send({ message: `${err.message} - Id da disciplina não localizado.` });
    } else {
      res.status(200).send(subjects);
    }
  });
};

const createSubject = (req, res) => {
  let subject = new subjects({
  name: req.body.name,
  dayOfweek: req.body.dayOfweek,
  time: req.body.time,
  });
  subject.save((err) => {
    if (err) {
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao cadastrar a disciplina` });
    } else {
      res.redirect("/admin/subjects");
    }
  });
};

const updateSubject = (req, res) => {
  const id = req.params.id;
  req.body.administrador = Boolean(req.body.administrador);

  subjects.findByIdAndUpdate(id, { $set: req.body }, (err) => {
    if (!err) {
      res.redirect("/admin/subjects");
    } else {
      res.status(500).send({ message: err.message });
    }
  });
};

const deleteSubject = (req, res) => {
  const id = req.params.id;

  subjects.findByIdAndDelete(id, (err) => {
    if (!err) {
      res.redirect("/admin/subjects");
    } else {
      res.status(500).send({ message: err.message });
    }
  });
};



export default {
  readSubjects,
  readSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};