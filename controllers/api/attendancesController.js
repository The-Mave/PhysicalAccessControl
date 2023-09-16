import attendances from "../../models/attendance.js";

const readAttendances = (req, res) => {
    attendances.find((err, attendances) => {
      res.status(200).json(attendances);
    });
  };


const createAttendance = (req, res) => {
    
  const date = new Date()
  let attendance = new attendances({
  date: date.getDate(),
  time: date.now(),
  present: true,
  });
  attendance.save((err) => {
    if (err) {
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao cadastrar a presença do professor` });
    } else {
      res.redirect("/admin/attendances");
    }
  });
};

export default {
  readAttendances,
  createAttendance
};