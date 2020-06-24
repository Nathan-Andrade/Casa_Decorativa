const express = require("express");
const server = express();


const db = require("./db")

//configurar arquivos estáticos
server.use(express.static(__dirname + "/ws/public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//const ideias = [
//  {
//    img: "https://image.flaticon.com/icons/svg/3021/3021831.svg",
//    title: "Flores no vaso",
//    category: "Flores",
 //   description: "Lorem ipsum dolor, sit amet, adhuc nulla definiebas mei ad, ei doming aperiam delicata est.",
 //   url: "https://www.linkedin.com/in/nathan-a-1b9436124/"
//  },
//  {
//    img: "https://image.flaticon.com/icons/png/512/1198/1198654.png",
//    title: "Plantas no vaso",
//    category: "Plantas",
//    description: "Lorem ipsum dolor, sit amet, adhuc nulla definiebas mei ad, ei doming aperiam delicata est.",
 //   url: "https://www.linkedin.com/in/nathan-a-1b9436124/"
//  },
//  {
//    img: "https://image.flaticon.com/icons/svg/3057/3057195.svg",
//    title: "Mini-Hortas",
//    category: "Hortaliças",
//    description: "Lorem ipsum dolor, sit amet, adhuc nulla definiebas mei ad, ei doming aperiam delicata est.",
//    url: "https://www.linkedin.com/in/nathan-a-1b9436124/"
//  },
 // {
 //   img: "https://image.flaticon.com/icons/png/512/807/807421.png",
 //   title: "Tipos de vasos",
 //   category: "Vasos",
 //   description: "Lorem ipsum dolor, sit amet, adhuc nulla definiebas mei ad, ei doming aperiam delicata est.",
 //   url: "https://www.linkedin.com/in/nathan-a-1b9436124/"
 // },
//]


//configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure(__dirname + "/ws/views", {
  express:  server,
  noCache: true,
})

//rotas
server.get("/", function(req, res){

  db.all(`SELECT * FROM ideias`, function(err, rows){
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados")
    }

    const reversedIdeias = [...rows].reverse()

    let lastIdeias = []
    for (let ideia of reversedIdeias){
      if (lastIdeias.length < 2){
        lastIdeias.push(ideia)
      }
    }

    return res.render("index.html", {ideias: lastIdeias})
  })

})

server.get("/ideias", function(req, res){
  
  db.all(`SELECT * FROM ideias`, function(err, rows){
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados")
    }

    const reversedIdeias = [...rows].reverse()

  return res.render("ideias.html", {ideias: reversedIdeias})
  })
  
})

server.post("/", function(req, res){
  //Inserir dados
  const query = `
     INSERT INTO ideias(
       image,
       title,
       category,
       description,
       link
      ) VALUES(?,?,?,?,?);
    `

    const values = [
      req.body.image,
      req.body.title,
      req.body.category,
      req.body.description,
      req.body.link
    ]

  db.run(query, values, function(err){
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados")
    }

    return res.redirect("/ideias")
  })
})

//servidor na porta 3333
server.listen(3333)