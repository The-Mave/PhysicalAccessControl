import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const index = (req, res) => {
  res.render("dashboard");
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