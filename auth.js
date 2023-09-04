const passport = require('passport');
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();

// SUBSTITUI O BANCO DE DADOS
const users = [
    { id: 1, username: '123456', password: 'pass' }
  ];


passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        // MUDAR AQUI COM A LOGICA DO BANCO
        const user = users.find(u => u.username === username);// await getUserByUsername(username); // COMENTEI PARA USAR A LISTA AO INVES DO BANCO DE DADOS
        console.log('auth.js >>','Utilizando login:', user.username);

        if (!user) {
          return done(null, false, { message: 'Usuário incorreto.' }),
          console.log('auth.js >> Usuário incorreto');
        }
        
        //TODO USAR O BCRYPT PARA CRIPTOGRAFAR AS SENHAS 

        if (user.password == password){
            passwordMatch = true;
        };

        console.log('COMPARANDO:', password, '&&', user.password);
        console.log(passwordMatch)
  
        if (!passwordMatch) {
          return done(null, false, { message: 'Senha incorreta.' }),
          console.log('auth.js >> Senha incorreta.');
        }
  
        return done(null, user);
      } catch (err) {
        return done(err),
        console.log('auth.js >> ',err);
      }
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      // Replace this with your actual user data retrieval logic
      const user = await getUserById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });


//   function getUserByUsername(username){

//   }

function getUserById(id){
    const user = users.find(u => u.id === id);
    id = user.id;
    return id;
}

module.exports = app;