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
  dayOfWeek: req.body.dayOfWeek,
  time: req.body.time,
  drt_professor: req.body.drt_professor,
  id_classroom: req.body.id_classroom
  });
  subject.save()
  res.redirect("/admin/subjects");
};

const updateSubject = (req, res) => {
  const id = req.body.id;
  subjects.findByPk(id)
  .then((subject) => {
    subject.update({ 
      name: req.body.name,
      dayOfWeek: req.body.dayOfWeek,
      time: req.body.time })
    res.redirect("/admin/subjects");    
  })
};

const deleteSubject = (req, res) => {
  const id = req.params.id;
  subjects.findByPk(id)
  .then((subject) => {
    subject.destroy()
    res.redirect("/admin/subjects")
    })
  };



export default {
  readSubjects,
  readSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};