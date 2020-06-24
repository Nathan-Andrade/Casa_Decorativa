const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){

  //Criar Tabela
    db.run(`CREATE TABLE IF NOT EXISTS ideias(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT, 
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT 
    );`
    )

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
      "https://image.flaticon.com/icons/svg/3021/3021831.svg",
      "Flores no vaso",
      "Flores",
      "Lorem ipsum dolor, sit amet, adhuc nulla definiebas mei ad, ei doming aperiam delicata est.",
      "https://www.linkedin.com/in/nathan-a-1b9436124/"
    ]
    
  db.run(query, values, function(err){
    if (err) return console.log(err)

    console.log(this)
  })

  //Deletar dados da tabela
 // db.run(`DELETE FROM ideias WHERE id = ?`, [1], function(err){
    //if (err) return console.log(err)

   // console.log("DELETE", this)
  //})

  //Consultar dados na tabela
 // db.all(`SELECT * FROM ideias`, function(err, rows){
  //  if (err) return console.log(err)

  //  console.log(rows)
 // })

  
})

module.exports = db