import attendances from "../../models/attendance.js";
import classrooms from "../../models/classroom.js";
import professors from "../../models/professor.js";
import subjects from "../../models/subject.js";

import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const index = (req, res) => {
  

  const decodedToken = jwt.decode(req.cookies.authcookie);
  console.log("\x1b[33m[WAIT]\x1b[0m Lendo informações do Token...")
  console.log("\x1b[33m[INFO]\x1b[0m", "ID DO USUÁRIO: ", decodedToken.id)
  const drt = decodedToken.id;

  professors.findByPk(drt)
  .then((result1) => {
    attendances.findAll({where:{ drt_professor: drt}})
    .then((result2) => {
      subjects.findAll({where:{ drt_professor: drt}})
      .then((result3) => {
        res.render("dashboard", {
        professor: result1,
        attendances: result2.reverse(),
        subjects: result3,
        wasPresent: function(attendance) {return attendance.present == 1},
        wasNotPresent: function(attendance) {return attendance.observation == "Falta não justificada"},
        nameOfSubject: function(attendance, subjects) {
          let name="";
          subjects.forEach((subject)=>{
            if(subject.id == attendance.id_subject){
              name = subject.name;
            }
          })
          return name;
        },
        dayText: function(day) {switch(day){
          case 1: return "Domingo";
          case 2: return "Segunda-Feira";
          case 3: return "Terça-Feira";
          case 4: return "Quarta-Feira";
          case 5: return "Quinta-Feira";
          case 6: return "Sexta-Feira";
          case 7: return "Sábado";
        }},
        round: function(value) {
          value = value *100;
          value = Math.round(value)/100;
          return value;
        }
        });
      });
    });
  });
};

const perfil =(req,res) =>{
  res.render("home/perfil");
}
const gerarrelatorios =(req,res) =>{
  res.render("gerar-relatorios");
}
const registropresenca =(req,res) =>{
  const decodedToken = jwt.decode(req.cookies.authcookie);
  const drt = decodedToken.id;
  professors.findByPk(drt)
  .then((result1) => {
    subjects.findAll({where:{ drt_professor: drt}})
    .then((result2) => {
      res.render("registro-presenca", {
        professor: result1,
        subjects: result2});
    })
  })
}

const justificarFalta =(req,res) =>{
  const decodedToken = jwt.decode(req.cookies.authcookie);
  const drt = decodedToken.id;
  const id = req.params.id;
  professors.findByPk(drt)
  .then((result1) => {
    attendances.findByPk(id)
    .then((result2) => {
      res.render("justificativa", {
        professor: result1,
        attendance: result2});
    })
  })
}

export default {
  index,
  perfil,
  gerarrelatorios,
  registropresenca,
  justificarFalta
};