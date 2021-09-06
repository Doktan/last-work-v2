const { Router } = require("express");
const router = Router();
const connection = require("../server");

//Возвращает всех сотрудников из workers
router.get('/get', (req,res)=>{
    const query = 'SELECT * FROM workers';
    connection.query(query, (err,result,fileds)=>{
        return res.status(200).send(result);
    });
});

router.post('/getById', (req,res)=>{
    const body = req.body.id_worker;
    const query = 'SELECT * FROM `workers` WHERE `id_worker` = ?';
    connection.query(query,body, (err,result,fields)=>{
        return res.status(200).send(result);
    });
});

//Создает всех сотрудников
router.post('/createWorker', (req,res)=>{
    //let reg = new RegExp('[0-9]');
    console.log(req.body.name);
    let rName = /[^А-я]\b\s?\b/;
    let rPassword = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    let errorText = [];
    let errorNum = 0;
    const id_dep = req.body.id_dep;
    const id_job = req.body.id_job;
    console.log('id_job: ',id_job);
    console.log('id_dep: ',id_dep);

    if(req.body.name === '') {
        errorText[errorNum] = 'Вы не ввели ФИО!';
        errorNum++;
    }
    if(req.body.telephone === '') {
        errorText[errorNum] = 'Вы не ввели телефон!';
        errorNum++;
    }
    if(errorNum === 2)
        return res.status(500).json({message: errorText});
    else{
        if(req.body.name.match(rName) && req.body.name !== '') {
            //return  res.status(500).json({message: 'ФИО содержит неккоректные символы!\n'})
            errorText[errorNum] = 'ФИО содержит некорректные символы!';
            errorNum++;
         }
         console.log(req.body.telephone);
         if(!(req.body.telephone.match(rPassword)) && req.body.telephone !== '') {
             errorText[errorNum] = 'Телефон содержит некорректные символы!';
             errorNum++;
         }
         if(errorNum !== 0) {
             return res.status(500).json({message: errorText});
         }

         const data = [req.body.name, req.body.telephone, id_dep, id_job];
         const query = 'INSERT INTO `workers`(`name`, `telephone`,`id_dep`,`id_job`) VALUES (?,?,?,?)';

         connection.query(query,data,(err,result,fields) => {
             if(err){
                 errorText[errorNum] = 'Что-то с сервером MySQL!';
                 return res.status(500).json({message: errorText});
             }
         })

         return res.status(200).json({message: []});
    }
});

 router.post('/delete', (req,res)=> {
    console.log("delete");
    const regular = /\s/g;
    let body = req.body.id.replace(regular,'');
    if(body === '')
       return res.status(500).json({message: ['Вы не ввели ID!']});
    if(body.match(/[^0-9]/))
        return res.status(500).json({message: ['ID содержит некорректные символы!']});
    const query = 'DELETE from `workers` where id_worker = ?';
    connection.query(query, body, (err, result, fields) => {
       if(result.affectedRows === 0) {
        return res.status(500).json({message: ['Нет сотрудника с таким ID!']});
       }
       else {
        return res.status(200).json({message: []});
       }
    })
});

router.post('/update', (req,res) => {
    const body = req.body;
    let updateBody = [];

    updateBody[0] = body.newName;
    updateBody[1] = body.newTelephone;
    updateBody[2] = body.newDep;
    updateBody[3] = body.newJob;

    let newAddress = [];
    newAddress[0] = body.address[0].name;
    newAddress[1] = body.address[0].telephone;
    newAddress[2] = body.address[0].id_dep;
    newAddress[3] = body.address[0].id_job;
    
    console.log('до');
    console.log(updateBody);
    console.log(newAddress);

    for(let i = 0 ; i < 4 ; i++) {
        if(!updateBody[i]) {
            updateBody[i] = newAddress[i];
        }
    }

    const address = body.address[0].id_worker;
    updateBody.push(address);
    console.log('то что будем вставлять')
    console.log(updateBody);

    let query = `UPDATE workers SET name = ?, telephone = ?, id_dep = ?, id_job = ? WHERE id_worker = ?`;
    // console.log(query);
    connection.query(query, updateBody, (err,results,fields) => {
        return res.status(200).json({message:[]});
    });
});

router.get('/view', (req,res)=>{
    const query = `SELECT w.id_worker,w.name,w.telephone, d.d_name as id_dep, j.job_name as id_job from workers w
    INNER JOIN 
    departments d
    ON
    d.id_department = w.id_dep
    INNER JOIN
    jobs j
    ON
    j.id_job = w.id_job`;
    connection.query(query, (err,r,f)=> {
        // console.log(r);
        return res.status(200).send(r);
    });
});

router.get('/sort', (req,res)=> {
    const query = 'SELECT * FROM workers GROUP BY name';
    connection.query(query,(err,r,f)=>{
        return res.status(200).send(r);
    });
});

router.get('/sortModEven', (req,res)=>{
    const query = 'SELECT * FROM workers WHERE MOD(id_worker,2) IS FALSE';
    connection.query(query,(e,r,f)=>{
        return res.status(200).send(r);
    });
});

router.get('/sortModOdd', (req,res)=> {
    const query = 'SELECT * FROM workers WHERE MOD(id_worker,2) != 0';
    connection.query(query,(e,r,f)=>{
        return res.status(200).send(r);
    });
});

module.exports = router;
