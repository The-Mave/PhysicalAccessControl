import attendances from "../../models/attendance.js";
import classrooms from "../../models/classroom.js";
import subjects from "../../models/subject.js";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const readAttendances = (req, res) => {
    attendances.find((err, attendances) => {
      res.status(200).json(attendances);
    });
  };


const createAttendance = (req, res) => {
  const decodedToken = jwt.decode(req.cookies.authcookie);
  const drt = decodedToken.id;

  const date = new Date()

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const f_date = year + '-' + month + '-' + day;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const f_hours = hours < 10 ? '0' + hours : hours;
  const f_minutes = minutes < 10 ? '0' + minutes : minutes;
  const f_seconds = seconds < 10 ? '0' + seconds : seconds;
console.log(req.body.latitude);
  const f_time = f_hours + ":" + f_minutes + ":" + f_seconds;
  let attendance = new attendances({
  date: f_date,
  time: f_time,
  present: true,
  drt_professor: drt,
  id_subject: req.body.id_subject,
  observation: "Presente",
  latitude: req.body.latitude,
  longitude: req.body.longitude
  });

  subjects.findByPk(req.body.id_subject).then((result1) => {
    classrooms.findByPk(result1.id_classroom).then((result2) => {
      const qrcode = result2.qrcode;
      const time = result1.time;
      const dayOfWeek = result1.dayOfWeek
      if (validateQRCode(req.body.qrcodeValidation, qrcode) && validateDate(dayOfWeek) && validateTime(time)){
        attendance.save();
        res.redirect("/");
      }
      else {
        res.redirect("/registro-presenca"); //Seria interessante colocar uma mensagem de  que a presença não foi computada.
      }
    })
  })
};

const validateQRCode = (a, b) => {
  return a == b;
};

const validateDate = (date) => {
  var dataAtual = new Date();
  return dataAtual.getDay() + 1 == date;
}

const validateTime = (horaFornecida) => {
  // Obtém a hora atual
  var horaAtual = new Date();

  // Formata a hora fornecida para um objeto Date
  var partesHoraFornecida = horaFornecida.split(":");
  var horaFornecidaDate = new Date();
  horaFornecidaDate.setHours(partesHoraFornecida[0]);
  horaFornecidaDate.setMinutes(partesHoraFornecida[1]);
  horaFornecidaDate.setSeconds(partesHoraFornecida[2] || 0);

  // Calcula a diferença em minutos entre a hora atual e a hora fornecida
  var diferencaMinutos = Math.abs(horaAtual - horaFornecidaDate) / (1000 * 60);

  // Verifica se a diferença está dentro do intervalo de 30 minutos
  if (diferencaMinutos <= 30) {
      return true; // Está dentro do intervalo de 30 minutos, retorna verdadeiro
  } else {
      return false; // Fora do intervalo de 30 minutos, retorna falso
  }
}


export default {
  readAttendances,
  createAttendance
};