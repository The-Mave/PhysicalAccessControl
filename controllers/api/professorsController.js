import professors from "../../models/professor.js";

const readProfessors = (req, res) => {
  professors.find()
  .exec((err, professors) => {
    res.status(200).json(professors);
  });
};

const readProfessorById = (req, res) => {
  const id = req.params.id;

  professors.findById(id)
  .exec((err, professors) => {
    if (err) {
      res
        .status(400)
        .send({ message: `${err.message} - Id do professor não localizado.` });
    } else {
      res.status(200).send(professors);
    }
  });
};

const createProfessor = (req, res) => {
  let professor = new professors({
  drt: req.body.drt,
  name: req.body.name,
  login: req.body.login,
  password: req.body.password,
  });
  professor.save((err) => {
    if (err) {
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao cadastrar o professor` });
    } else {
      res.redirect("/admin/professors");
    }
  });
};

const updateProfessor = (req, res) => {
  const drt = req.params.drt;
/*
  professors.findByIdAndUpdate(drt, { $set: req.body }, (err) => {
    if (!err) {
      res.redirect("/admin/professors");
    } else {
      res.status(500).send({ message: err.message });
    }
  });*/

  professors.find({ where: { drt: drt } })
  .on('success', function (professor) {
    // Check if record exists in db
    if (professor) {
      professor.update({ $set: req.body })
      .success(function () {})
      res.redirect("/admin/professors")
    }
  })

};

const deleteProfessor = (req, res) => {
  const id = req.params.id;

  professors.findByIdAndDelete(id, (err) => {
    if (!err) {
      res.redirect("/admin/professors");
    } else {
      res.status(500).send({ message: err.message });
    }
  });
};



export default {
  readProfessors,
  readProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor
};