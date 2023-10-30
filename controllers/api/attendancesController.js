import attendances from "../../models/attendance.js";

const readAttendances = (req, res) => {
    attendances.find((err, attendances) => {
      res.status(200).json(attendances);
    });
  };


const createAttendance = (req, res) => {
    
  const date = new Date()
  let attendance = new attendances({
  date: date.getDate(),
  time: date.now(),
  present: true,
  });
  attendance.save()
  res.redirect("/admin/attendances");
};

const obterLocalizacao = (req, res) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const apiKey = '25596983f67c4dac89ba67acad5fd107';

      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          const endereco = data.results[0].formatted;
          console.log("Endereço atual:", endereco);
          res.json({ endereco }); // Envie o endereço como resposta em JSON
        })
        .catch(error => {
          console.error("Erro ao obter endereço: " + error);
          res.status(500).json({ error: "Erro ao obter endereço." });
        });
    });
  } else {
    res.status(400).json({ error: "Geolocalização não suportada neste navegador." });
  }
};

export default {
  readAttendances,
  createAttendance,
  obterLocalizacao
};