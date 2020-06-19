const express = require("express");
const server = express();

//configurar arquivos estáticos
server.use(express.static(__dirname + '/public'));

server.get("/", function(req, res){
  return res.sendFile(__dirname + "/index.html")
})
server.get("/ideias", function(req, res){
  return res.sendFile(__dirname + "/ideias.html")
})

//servidor na porta 3000
server.listen(3000) 