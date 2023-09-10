import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"

const app = express();

app.set("port", process.env.PORT || 3000);

app.set('views', path.join(__dirname,'views'));
app.set("view engine", "ejs");

app.listen(app.get("port"),function(){
    console.log("Server started at port " + app.get("port"));
});


db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});


routes(app);

export default app;