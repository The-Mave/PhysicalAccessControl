//import usuarios from "../../models/usuario.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { request } from "express";

// BANCO DE DADOS (QUASE)
const usuarios = [
  { id: 1, username: '123456', password: 'pass' }
];


const jwt = jsonwebtoken
const User = usuarios

const secret = 'palavracabalistica' 

const login = (req,res) => {
  console.log("Render de index funcionou!")
  res.render("home/login");
};

const registrar = (req,res) => {
  console.log("registrar")
  console.log("Render de index funcionou!")
  res.render("home/signup");
};




// ROTAS COM AUTENTICAÇÃO
const perfilUser = async (req, res) => {
  const id = req.params.id;
  const result = checkToken(req,res)
  

  if (result){
    const user = await User.findById(id, "-passwordHash");
    console.log('\x1b[32m\x1b[1m', '[X] Autenticação validada para rota privada' ,'\x1b[0m');

  if (!user) {
    console.log('\x1b[41m\x1b[1m', '[X] Autenticação NAO validada para rota privada' ,'\x1b[0m');
    return res.status(404).json({ msg: "Usuário não encontrado!" });

  }

  res.status(200).json({ user });
  }
};

const checkToken = (req, res) => {

  const authcookie = req.cookies.authcookie

  console.log("----------------------------------")
  console.log("------------CheckToken------------")
  console.log("----------------------------------")
  console.log("authcookie: " + authcookie)

  const token = authcookie

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  
  try {
    jwt.verify(token, secret);
    console.log("token: " + token)
    console.log("secret: " + secret)
    console.log('\x1b[32m\x1b[1m', '[X] Autenticação validada' ,'\x1b[0m');
    const decodedToken = jwt.decode(token);
    console.log('decodedToken:',decodedToken);
    return true
    

  } catch (err) {
    console.log(err)
    console.log('\x1b[32m', 'Verificação de token Falhou' ,'\x1b[0m');
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}


const loginUser = async(req,res) => {
  const { email, senha } = req.body;

  // VALIDACOES
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!senha) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // VERIFICAR S EO EMAIL JA ESTA REGISTRADO
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // VERIFICAR SE A SENHA BATE
  
  const checkPassword = await bcrypt.compare(senha, user.passwordHash);
  console.log("Senha: " + senha)
  console.log("Senha Crypt: " + user.passwordHash)
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
  
    res.cookie('authcookie',token) 
    
    //   // limpar os cookies para logout

    // res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
    res.redirect('/');
    console.log('\x1b[32m\x1b[1m', '[X] Login realizado' ,'\x1b[0m');
    // VERIFICACAO DO TOKEN
    

  } catch (error) {
    res.status(500).json({ msg: error });
    console.log('\x1b[32m', 'Login Falhou' ,'\x1b[0m');
  }
}
const logout = async(req,res) =>{
  res.clearCookie('authcookie');
  // REDIRECT OT HOME
  res.redirect('/');
}

/*
const registrarUser = async(req,res) => {
  const {nome, sobrenome, email, senha, confirmarsenha, cpf, nascimento} = req.body
  const administrador = false

  // VERIFICAR SE É NECESSARIO CRIAR O USERNAME
  if (!nome) {
    return res.status(422).json({ msg: "O campo nome é obrigatório!" });
  }

  if (!sobrenome) {
    return res.status(422).json({ msg: "O campo sobrenome é obrigatório!" });
  }

  if (!email) {
    return res.status(422).json({ msg: "O campo email é obrigatório!" });
  }

  if (!senha) {
    return res.status(422).json({ msg: "A campo senha é obrigatório!" });
  }

  if (senha != confirmarsenha) {
    return res
      .status(422)
      .json({ msg: "A senha e a confirmação precisam ser iguais!" });
  }
  if (!cpf) {
    return res.status(422).json({ msg: "A campo cpf é obrigatório!" });
  }
  if (!nascimento) {
    return res.status(422).json({ msg: "A campo cpf é obrigatório!" });
  }

  // VERIFICAR SE O USUARIO EXISTE (CASO EXISTA NÃO CADASTRA)
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: "Usuário já cadastrado, utilize outro e-mail ou faça login." });
  }

  // CRIAR SENHA
  const salt = await bcrypt.genSalt(12); // O SALT SERVE PARA CRIAR UM NUMERO ALEATORIO 
  const passwordHash = await bcrypt.hash(senha, salt); // O BCRYPT CRIPTOGRAFA A SENHA DO USUARIO, EMBARALHANDO COM O SALT

  // CRIAR O USUARIO
  const user = new User({
    nome,
    sobrenome,
    email,
    cpf, 
    nascimento,
    passwordHash,
    administrador,
    imagem: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAYFBMVEVmZmb///9VVVVeXl5iYmJaWlpcXFzR0dFWVlZwcHD8/PysrKzf39/GxsZsbGzt7e2Ojo719fXn5+d+fn6VlZWlpaWEhITAwMDU1NS4uLjc3NyLi4udnZ1vb293d3fLy8uj0/C3AAAEW0lEQVR4nO2b2XriMAyFwUvIAgFCWAItff+3HJjIIWUoYwcXLHP+yzbhkyL7yLbk0QgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv4aSidbihNaJVK+2xjdSy3q7q5bjE8tqt61Pf3i1Tf5Qumyq8RVVU+o44qhEPb32rmVaiwhcTBfz2+6dmS/SV9v3ILL8IXpdFEvWc1Gs77t3Zi1ebeVw9KTnSD4pFpkUQmaLYpL3/jHRr7ZzIEr1Zt9sI7rsd8qIYjPrzUTFUmuUWnbBK3Ry5YNKdNGFccnSw4t/W3lTSKTcXjx8tnWPo834XK5+nGN6ZYI4ZzcPhdGX6fXg7KO0ySITZloq15aGdx9izSsfltaB6Twsn2GXL1IaeVOLgSfMs4xWbWpB+pLYPJ2Q3C74SKkgBV1ZmaxWpKRsdEbVlP8stV9TPqy5hJC0P7fWRdmmwz2XZEgSWtg7WLASUtm05jrEQ7dvNDxyoW7PX2ZWEtqStHuLiscYlW04Ng6SoTbtOywiSBqaO4m+yPnoKG2CJg4j9DRGJ7Sx+i2rPJLsHDX0DOnozumrvAjSGLeFFy3uWKiMbpeWmdtbWbt45eCgGCSIJL0clqNikKnD3noJ7+JgvEM0epGJPk1En+ijX6pFv9iOfrv0Bhve2I8soj90GnxsOOUxQt/g4Df6o/uu+JJbhVBTmZdR8SX68ln8BdD4S9i9JoR7TZN8mxB6bSR5nG0k8TcCxd/KFX0z3ij6dspR/A2xFi3Ne94tzSOVJvt7/k0z1o33SizuundmvmZ7RUSJ+s6Nggt5kbKMol79c9vlRxc/+AmNSr6+O1HNisWxPF/OKo+HYnalPVXGbJzqQz/TLbcbreXlyplSUqer7/eZClZBFNue6bOVuHWd7uRk2fQ+w5TPnTuVXAZgXsg7Tdsy7elQnjHxUJXdKnvcpP+ZWyepvTy9YTERVdYZvFcWFqu06V6oGZTPev7VlsdIyWc3TuvgY6jMcdN4PrKeUirtcsohdA+lmVFfTrKfdtuOY9hKYw45x41jWktqo6VBh9BUGcaF8ymu3Jh8GHDGV4cuO7i/LE0M3doXnkqSD5l/3dtmHjq22DwPTVpYDRxk6YPv/zamk2A8WAdN2e0jTCU15j1QBvskJQ2y0GTqupMHrEuagHXGBPAh29J2nWBXOX0upqr72Mc3w2Ad3izUey/Th8ZBgPV65+aY25gQ2vUvPBFTCnt48qTtYmEWmsyQOrg0qN2GGsHcmhWfwNHfZqf9JZdmxSdA333p4btT2T6wxjwqsfiwir5VYI1rdJfg4GFcmc6uoBz0alQaYKJQHx6HFS0ZglrMUBb0k7zkLLxMSLcC/GwCVIB3KEja/TRE0slOUB3qdF/p6OfX2kVDUPeYaAHpqSOS1u0hbev93v4L8C5h9A6OxF/C/DUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg7fgDyhYmCCEbhAQAAAAASUVORK5CYII="
  });

  try {
    await user.save();

    // res.status(201).json({ msg: "Usuário criado com sucesso!" });
    res.redirect('/login')
  
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

export default {
  //registrarUser,
  registrar,
  login,
  loginUser,
  perfilUser,
  logout
};