import attendances from "../../models/attendance.js";
import classrooms from "../../models/classroom.js";
import professors from "../../models/professor.js";
import subjects from "../../models/subject.js";

const dashboard = (req,res) => {
  attendances.findAll()
  .then((result1) => {
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
            subjects: result4
            });
          });
        });
      });
    });
  };

// READ

const adminGetAttendances = (req, res) => {
  attendances.findAll()
  .then((result) => {
    res.render("admin/attendances", {
      attendances: result,
    });
  });
};

const adminGetClassrooms = (req, res) => {
    classrooms.findAll()
    .then((result) => {
      res.render("admin/classrooms", {
        classrooms: result,
      });
    });
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

  subjects.findByPk(id).then((result) => {
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
  classrooms.findAll().then((result1) => {
    professors.findAll().then((result2) => {
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
