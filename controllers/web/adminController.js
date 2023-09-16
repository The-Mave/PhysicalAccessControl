import attendances from "../../models/attendance.js";
import classrooms from "../../models/classroom.js";
import professors from "../../models/professor.js";
import subjects from "../../models/subject.js";

const dashboard = (req,res) => {
  res.render("admin/index");
};

// READ

const adminGetAttendances = (req, res) => {
  attendances.find()
  .populate('professor') //Não tenho certeza se funciona o populate no banco de dados relacional. Precisa testar
  .then((result) => {
    res.render("admin/attendances", {
      attendances: result,
    });
  });
};

const adminGetClassrooms = (req, res) => {
    categorias.find()
    .then((result) => {
      res.render("admin/classrooms", {
        classrooms: result,
      });
    });
  };

const adminGetProfessors = (req, res) => {
  usuarios.find()
  .populate('subject')
  .then((result) => {
    res.render("admin/professors", {
      professors: result,
    });
  });
};

const adminGetSubjects = (req, res) => {
  usuarios.find()
  .populate('professor', 'classroom')
  .then((result) => {
    res.render("admin/subjects", {
      subjects: result,
    });
  });
};

// UPDATE CRUD

const adminUpdateClassrooms = (req,res) => {
    const id = req.params.id;

    classrooms.findById(id).then((result) => {
        res.render("admin/classrooms_edit", {
          classroom: result
        });
      });
}

const adminUpdateProfessors = (req,res) => {
  const id = req.params.drt;

  professors.findById(id).then((result) => {
      res.render("admin/professors_edit", {
        professor: result
      });
    });
}

const adminUpdateSubjects = (req,res) => {
  const id = req.params.id;

  subjects.findById(id).then((result) => {
      res.render("admin/subjects_edit", {
        subject: result
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
  classrooms.find().then((result1) => {
    professors.find().then((result2) => {
      res.render("admin/subjects_create", {
        classrooms: result1,
        professors: result2
      });
    })
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
adminCreateSubjects
};
