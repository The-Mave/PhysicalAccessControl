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
  classroom.save()
  res.redirect("/admin/classrooms");
};

const updateClassroom = (req, res) => {
  const id = req.body.id;
  classrooms.findByPk(id)
  .then((classroom) => {
    classroom.update({ 
      number: req.body.number,
      building: req.body.building,
      qrcode: req.body.qrcode })
    res.redirect("/admin/classrooms");    
  })
};

const deleteClassroom = (req, res) => {
  const id = req.params.id;
  classrooms.findByPk(id)
  .then((classroom) => {
    classroom.destroy()
    res.redirect("/admin/classrooms")
    })
  };



export default {
  readClassrooms,
  readClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom
};