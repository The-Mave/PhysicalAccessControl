import professors from "../../models/professor.js";

const readProfessors = (req, res) => {
  professors.find()
  .exec((err, professors) => {
    res.status(200).json(professors);
  });
};

const readProfessorById = (req, res) => {
  const id = req.params.id;

  professors.findByPk(id)
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
  professor.save()
  res.redirect("/admin/professors");
};

const updateProfessor = (req, res) => {
  const drt = req.body.drt;
  professors.findByPk(drt)
  .then((professor) => {
    professor.update({ 
      name: req.body.name,
      login: req.body.login,
      password: req.body.password })
    res.redirect("/admin/professors");    
  })
};

const deleteProfessor = (req, res) => {
  const drt = req.params.id;
  professors.findByPk(drt)
  .then((professor) => {
    professor.destroy()
    res.redirect("/admin/professors")
    })
  };

export default {
  readProfessors,
  readProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor
};