//import usuarios from "../../models/usuario.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { request } from "express";
import professors from "../../models/professor.js";

const jwt = jsonwebtoken
const secret = 'palavracabalistica' 

const login = (req,res) => {
  console.log("\x1b[33m[WAIT]\x1b[0m Renderizando página de login...")
  res.render("login");
};

const registrar = (req,res) => {
  console.log("register")
  console.log("\x1b[33m[WAIT]\x1b[0m Renderizando página de register...")
  res.render("home/signup");
};

// ROTAS COM AUTENTICAÇÃO
const perfilUser = async (req, res) => {
  const id = req.params.id;
  const result = checkToken(req,res)

  if (result){
    const professor = await professors.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

  if (!professor) {
    console.log('\x1b[41m\x1b[1m', '[X] Autenticação NAO valida para rota privada' ,'\x1b[0m');
    return res.status(404).json({ msg: "User not found!" });

  }

  res.status(200).json({ professor });
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


  console.log("\x1b[33m[WAIT]\x1b[0m Buscando Credenciais de Login...", "...Email: ",email, "...Senha: ", senha)
  if (!email || !senha) {
    console.log("\x1b[31m[ERROR]\x1b[0m Não foi possível validar as credenciais...", "...Email: ",email, "...Senha: ", senha)
    return res.status(400).json({ message: 'Informe o email e a senha.' });
  }
  console.log("\x1b[32m[OK]\x1b[0m Login autorizado para o...", "...Email: ",email)

  try {
    const professor = await professors.findOne({ where: { login: email } });
    console.log("\x1b[33m[WAIT]\x1b[0m Buscando usuário no banco de dados...", "...Email: ",email)
    if (!professor) {
      console.log("\x1b[31m[ERROR]\x1b[0m Usuário não encontrado no banco de dados...", "...Email: ",email)
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    console.log("\x1b[32m[OK]\x1b[0m Usuário encontrado no banco de dados...", "...Email: ",email)
    
    const saltRounds = 10;
    const myPlaintextPassword = senha;
    const hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);

    // MUDAR DE HASH2 PARA Professor.password

    const checkPassword = await bcrypt.compare(senha, hash2);
    console.log("\x1b[33m[WAIT]\x1b[0m Comparando senha do usuário... ", "...Email: ",email)
              // PASSWORD DEBUG
              console.log("\x1b[33m Senha ClearText: \x1b[0m" + senha)
              console.log("\x1b[33m Senha Encriptada: \x1b[0m" + hash2)
              console.log("\x1b[33m Senha Esperada: \x1b[0m" + hash2)

    if (!checkPassword) {
      console.log("\x1b[31m[ERROR]\x1b[0m Senha não pode ser validada...", "...Email: ",email)
      return res.status(401).json({ msg: "Senha inválida" });
    }

    try {
      const token = jwt.sign(
        {
          id: professor.drt, 
          email: professor.email
        },
        secret
      );
    
      res.cookie('authcookie',token) 

      // res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
      res.redirect('/');
      console.log("\x1b[32m[OK]\x1b[0m Login efetuado com sucesso...", "...Email: ",email)
      console.log("\x1b[32m[OK]\x1b[0m Token da sessão...", token)

    } catch (error) {
      res.status(500).json({ msg: error });
      console.log('\x1b[31m[ERROR]\x1b[0m Token Sign-in Falhou' ,'\x1b[0m');
    }
  } catch (error) {
  res.status(500).json({ msg: error });
    console.log('\x1b[31m[ERROR]\x1b[0m Login Falhou' ,'\x1b[0m');
}
}

const logout = async(req,res) =>{
  res.clearCookie('authcookie');
  res.redirect('/');
}


export default {
  //registrarUser,
  registrar,
  login,
  loginUser,
  perfilUser,
  logout
};