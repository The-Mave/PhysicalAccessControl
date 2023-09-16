import classrooms from "../../models/classroom.js";

const readClassrooms = (req, res) => {
  classrooms.find((err, classrooms) => {
    res.status(200).json(classrooms);
  });
};

const readClassroomById = (req, res) => {
  const id = req.params.id;

  classrooms.findById(id)
  .exec((err, classrooms) => {
    if (err) {
      res
        .status(400)
        .send({ message: `${err.message} - Id da sala de aula não localizado.` });
    } else {
      res.status(200).send(classrooms);
    }
  });
};

const createClassroom = (req, res) => {
  let classroom = new classrooms({
  number: req.body.number,
  building: req.body.building,
  qrcode: req.body.qrcode,
  });
  classroom.save((err) => {
    if (err) {
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao cadastrar a sala de aula` });
    } else {
      res.redirect("/admin/classrooms");
    }
  });
};

const updateClassroom = (req, res) => {
  const id = req.params.id;
  req.body.administrador = Boolean(req.body.administrador);

  classrooms.findByIdAndUpdate(id, { $set: req.body }, (err) => {
    if (!err) {
      res.redirect("/admin/classrooms");
    } else {
      res.status(500).send({ message: err.message });
    }
  });
};

const deleteClassroom = (req, res) => {
  const id = req.params.id;

  classrooms.findByIdAndDelete(id, (err) => {
    if (!err) {
      res.redirect("/admin/classrooms");
    } else {
      res.status(500).send({ message: err.message });
    }
  });
};



export default {
  readClassrooms,
  readClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom
};