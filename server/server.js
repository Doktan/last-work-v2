const express = require('express');
const app = express();
const mysql = require("mysql2");
const dbConfig = require('./db.config');
const bodyParser = require('body-parser');
// роут авторизации/регистрации
//app.use('/api/auth', require('./routes/auth.routes'));
/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "pizza",
    password: ""
  });*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });
  
async function start() {
  try {
    connection.connect((err) => {
        if(err){
            console.log("Ошибка: ", err);
        }
        else
            console.log("mysql connection is stable");
    })
    module.exports = connection;
    app.listen(8000, () => {
      console.log('App has been started on port ', 8000);
    });
  } catch (error) {
    console.log('Server error: ', error);
    process.exit(1);
  }
};

start();

app.get('/', (req,res)=>{
  return res.status(200).json({message: "Добро пожаловать на сервер моей работы по ОиХД"});
})

//роут теста
app.use('/api/test', require('./routes/test'));

//роут сотрудников
app.use('/api/worker', require('./routes/work'));

//роут отделов
app.use('/api/dep', require('./routes/dep'));

//роут должностей
app.use('/api/job', require('./routes/job'));

//роут заказов
app.use('/api/order', require('./routes/order'));

//роут курьеров
app.use('/api/cour', require('./routes/courier'));
