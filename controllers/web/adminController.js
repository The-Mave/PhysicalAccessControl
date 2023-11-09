import attendances from "../../models/attendance.js";
import classrooms from "../../models/classroom.js";
import professors from "../../models/professor.js";
import subjects from "../../models/subject.js";
import qrcode from "qrcode";

const dashboard = (req,res) => {
  attendances.findAll()
  .then((result1) => {

    // constantes para o gráfico
    const present = result1.filter(function(attendance) {return attendance.present == 1}).length;
    const notPresent = result1.length - present;

    classrooms.findAll()
    .then((result2) => {
      professors.findAll()
      
      .then((result3) => {
        subjects.findAll()
        .then((result4) => {
          res.render("admin/index", {
            attendances: result1,
            classrooms: result2,
            professors: result3,
            subjects: result4,
            dayText: function(day) {switch(day){
              case 1: return "Domingo";
              case 2: return "Segunda-Feira";
              case 3: return "Terça-Feira";
              case 4: return "Quarta-Feira";
              case 5: return "Quinta-Feira";
              case 6: return "Sexta-Feira";
              case 7: return "Sábado";
            }},
            nameOfSubject: function(attendance, subjects) {
              let name="";
              subjects.forEach((subject)=>{
                if(subject.id == attendance.id_subject){
                  name = subject.name;
                }
              })
              return name;
            },
            present: present,
            notPresent: notPresent,
            round: function(value) {
              value = value *100;
              value = Math.round(value)/100;
              return value;
            }
            });
          });
        });
      });
    });
  };

// READ

const adminGetAttendances = (req, res) => {
  attendances.findAll()
  .then((result1) => {
    subjects.findAll()
    .then((result2) => {
      res.render("admin/attendances", {
        attendances: result1,
        subjects: result2,
        nameOfSubject: function(attendance, subjects) {
          let name="";
          subjects.forEach((subject)=>{
            if(subject.id == attendance.id_subject){
              console.log(subject.name);
              name = subject.name;
            }
          })
          return name;
        }
      });
    });
  });
};

const adminGetClassrooms = async (req, res) => {
  try {
    const result = await classrooms.findAll();
    const qrcodes = await Promise.all(
      result.map((element) => {
        return new Promise((resolve, reject) => {
          qrcode.toDataURL(element.qrcode, (err, src) => {
            if (err) {
              reject(err);
            } else {
              resolve(src);
            }
          });
        });
      })
    );

    res.render("admin/classrooms", {
      classrooms: result,
      qrcode: qrcodes
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno do servidor");
  }
};

const adminGetProfessors = (req, res) => {
  professors.findAll()
  .then((result) => {
    res.render("admin/professors", {
      professors: result,
    });
  });
};

const adminGetSubjects = (req, res) => {
  subjects.findAll()
  .then((result) => {
    res.render("admin/subjects", {
      subjects: result,
    });
  });
};

// UPDATE CRUD

const adminUpdateClassrooms = (req,res) => {
    const id = req.params.id;

    classrooms.findByPk(id).then((result) => {
        res.render("admin/classrooms_edit", {
          classroom: result
        });
      });
}

const adminUpdateProfessors = (req,res) => {
  const drt = req.params.id;

  professors.findByPk(drt).then((result) => {
      res.render("admin/professors_edit", {
        professor: result
      });
    });
}

const adminUpdateSubjects = (req,res) => {
  const id = req.params.id;

  subjects.findByPk(id).then((result1) => {
    classrooms.findAll().then((result2) => {
      professors.findAll().then((result3) => {
      res.render("admin/subjects_edit", {
        subject: result1,
        classrooms: result2,
        professors: result3
      });
    });
  });
});
}

// CREATE CRUD

const adminCreateClassrooms = (req,res) => {
  res.render("admin/classrooms_create");
}

const adminCreateProfessors = (req,res) => {
  res.render("admin/professors_create");
}

const adminCreateSubjects = (req,res) => {
  classrooms.findAll().then((result1) => {
    professors.findAll().then((result2) => {
      res.render("admin/subjects_create", {
        classrooms: result1,
        professors: result2
      });
    })
  });
};

const adminGetAttendancesByProfessor = (req, res) => {
  const drt = req.params.drt;
  attendances.findAll({where:{ drt_professor: drt}})
  .then((result1) => {
    professors.findByPk(drt)
    .then((result2) => {
      subjects.findAll({where:{ drt_professor: drt}})
      .then((result3) => {
      res.render("admin/attendancesReport", {
        attendances: result1,
        professor: result2,
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
        }
        });
      });
    });
  });
};

export default {
dashboard,
adminGetAttendances,
adminGetClassrooms,
adminGetProfessors,
adminGetSubjects,
adminUpdateClassrooms,
adminUpdateProfessors,
adminUpdateSubjects,
adminCreateClassrooms,
adminCreateProfessors,
adminCreateSubjects,
adminGetAttendancesByProfessor
};
