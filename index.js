const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 8008

const db = mysql.createConnection({
  host : 'localhost' ,
  user : 'root' ,
  database : 'first-api',
})
db.connect((err) => {
  if(err) {
    console.error("Database Connection ",err)
    return
  }
  console.log("Database connected successfully")
})

app.get("/records" , (req,res)=> {
  const limit = parseInt(req.query.limit) || 1000
  const offset = parseInt(req.query.offset) || 0
  const query = "SELECT * from firstapi_table LIMIT ? OFFSET ?"

  db.query(query , [limit , offset] , (error , results) => {
    if(error) {
      console.error("Query Error" , error)
      return res.status(500).json({error : "Error Occured"})
    }
    res.json(results);
  })
})

app.listen(port , () => {
  console.log("App running at port " + port)
})
