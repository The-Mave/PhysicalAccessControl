import attendances from "../../models/attendance.js";
import classrooms from "../../models/classroom.js";
import professors from "../../models/professor.js";
import subjects from "../../models/subject.js";

import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const index = (req, res) => {
  const drt = 1111134; // valor fixo provisório

  professors.findByPk(drt)
  .then((result1) => {
    attendances.findAll({where:{ drt_professor: drt}})
    .then((result2) => {
      subjects.findAll({where:{ drt_professor: drt}})
      .then((result3) => {
        res.render("dashboard", {
        professor: result1,
        attendances: result2,
        subjects: result3,
        wasPresent: function(attendance) {return attendance.present == 1},
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
  res.render("registro-presenca");
}

export default {
  index,
  perfil,
  gerarrelatorios,
  registropresenca,
};