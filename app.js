import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import path from "path"
import { fileURLToPath } from 'url'
import methodOverride from 'method-override'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.set("port", process.env.PORT || 3000);

app.set('views', path.join(__dirname,'views'));
app.set("view engine", "ejs");

console.log('\x1b[33m[WAIT]\x1b[0m Iniciando servidor...');

app.listen(app.get("port"),function(){
    console.log("\x1b[32m[OK]\x1b[0m Servidor iniciado na porta: " + app.get("port"));
    console.log('\x1b[34m[LINK]\x1b[0m Acesse o servidor por esse link:...', 'http://localhost:'+ app.get("port"));

});

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(methodOverride('_method'));

try {
  console.log('\x1b[33m[WAIT]\x1b[0m Conectando com o banco de dados...');
  await db.authenticate();
  console.log('\x1b[32m[OK]\x1b[0m Conectado com o banco de dados');

} catch (error) {
  console.log('\x1b[31m[ERROR]\x1b[0m Não foi possível se conectar com o banco de dados', error);
}

routes(app);

export default app;