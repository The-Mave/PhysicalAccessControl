const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcrypt'); // You'll need bcrypt for password hashing
const path = require('path'); // Importe o módulo path
const auth = require('./auth'); // Importe o arquivo de configuração de autenticação
const bodyParser = require('body-parser');


const app = express();
app.use
app.use(session({
    secret: 'palavracabalistica',
    resave: false,
    saveUninitialized: false
  }));


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(auth);

// Pasta de visualização (views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Middlewares e configurações do Express

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

// ➤➤ TODO: MIGRAR TUDO PARA A PASTA ROUTES

// ROTAS E VISUALIZAÇÃOES


// Login: Página para autenticação de professores, com opção de autenticação de dois fatores.
app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true,
    
  }));
app.get('/logout', (req, res) => {
    req.logout(); // Logout do usuário
    res.redirect('/login');
});

// A Dashboard vai ser a pagina inicial, assim que o usuário autentica ele é redirecionado para ela
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});


// Registro de presença: Esta página permite que os professores registrem sua presença escaneando o QR Code e confirmem a geolocalização.
app.get('/registro-presenca',isAuthenticated, (req, res) => {
    res.render('registro-presenca');
});


// Relatorios: Essa página permite a geração de relatórios semanais com as informações de presença dos professores.
app.get('/gerar-relatorios',isAuthenticated, (req, res) => {
    res.render('gerar-relatorios');
});




// 🔽 CONFIGURAÇÃO DO LOCALHOST
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});