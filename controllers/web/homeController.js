import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const index = (req, res) => {
  res.render("home/index");
};

const perfil =(req,res) =>{
  res.render("home/perfil");
}

export default {
  index,
  perfil
};