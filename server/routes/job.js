const { Router } = require("express");
const router = Router();
const connection = require("../server");

// table name = jobs
// fields = id_dep, id_job, job_name 
// /api/job

router.post('/create', (req,res) => {

    let jobName = req.body.name;    // название должности
    let d_num = req.body.d_num; //номер отдела

    console.log("job: ",jobName, " id_dep: ", d_num); 
    let errorText = [];
    let errorNum = 0;

    if(!jobName) {
        errorText[errorNum] = 'Вы не указали название должности!';
        errorNum++;
    }
    if(!d_num) {
        errorText[errorNum] = 'Вы не указали отдел!';
        errorNum++;
    }
    
    if(errorNum !== 0) {
        return res.status(500).json({message: errorText});
    }

    jobName = jobName.trim();

    const select = 'SELECT id_job FROM jobs WHERE job_name = ?';
    connection.query(select,[jobName], (err,result,fields)=>{
        console.log(result[0]);
        if(result[0]) {
            return res.status(500).json({message: ['Такая должность уже существует']});
        }
        else {
            const insert = 'INSERT INTO jobs (`job_name`,`id_dep`) VALUES (?, ?) ';
            connection.query(insert, [jobName,d_num], (err,result,fields) => { 
            })
            res.status(200).json({message:[]});
        }
    })
}); 

router.get('/get', (req,res)=>{
    const query = 'SELECT * FROM jobs';
    connection.query(query, (err,results,fields)=>{
        return res.status(200).send(results);
    });
});

//id_job

router.post('/delete', (req,res)=>{
    const body = req.body.jobId;
    const query = 'DELETE FROM `jobs` WHERE `id_job` = ?';
    connection.query(query, body, (err, result, fileds) => {
         res.status(200).json({message: []});
    });
});

router.post('/getByDep', (req,res)=>{
    const body = req.body.data;
    const query = 'SELECT job_name, id_job FROM `jobs` WHERE `id_dep` = ?';
    connection.query(query, [body], (err,results, fields) => {
        return res.status(200).send(results);
    });
});

module.exports = router;
