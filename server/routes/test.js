const { Router } = require("express");
const router = Router();
const connection = require("../server")


//const sql = "INSERT INTO users(name, age) VALUES(?, ?)";

router.post('/test', (req, res) => {
    console.log(req.body);
   return res.status(200).json({message: "hello world from post"});
    
   /*connection.query(
        "INSERT INTO test(name,password,email VALUES(?,?,?)",
    )*/
})

 router.get('/test', (req,res)=>{
    console.log("bruh");
    connection.query('SELECT * FROM test', function (error, results, fields) {
        if (error)
        console.log("смтри сюда: ", error);
        else{
            console.log("запрущен успешен");
            console.log(results[0].name);
        }
      });
    return res.status(200).json({message: "hello world"});
})

module.exports = router;
