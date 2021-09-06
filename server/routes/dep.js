const { Router } = require("express");
const router = Router();
const connection = require("../server");

// /api/dep

router.post('/create', (req,res) => {
    let body = req.body.dName
    console.log(body);
    let errorText;
    if(body === '') {
        errorText = ['Вы не ввели название отдела'];
        return res.status(500).json({message: errorText});
    }
    body = body.trim();
    const testQ = 'SELECT * from `departments` WHERE `d_name` = ?';
    connection.query(testQ, body, (err,results, field) => {
        if(err){
            errorText = ['Что-то с сервером MySQL!'];
            return res.status(500).json({message: errorText});
        }
        else
            if(results[0] === undefined) {
                const query = 'INSERT INTO `departments` (`d_name`) VALUES(?)';
                connection.query(query, body, (err,results, field) => {
                    if(err){
                        errorText = 'Что-то с сервером MySQL!';
                        return res.status(500).json({message: errorText});
                    }
                    else {
                        return res.status(200).json({message: []});
                    }
                })
                
            }
            else {
                errorText = ['Такой отдел уже есть!'];
                return res.status(500).json({message: errorText});
            }
    });
});

router.get('/get', (req,res) => {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err,result,fileds)=>{
        return res.status(200).send(result);
    });
});

router.post('/delete', (req,res) => {
    const body = req.body.data;
    const query = 'DELETE FROM `departments` WHERE `id_department` = ?';
    connection.query(query, body, (err, result, fileds) => {
        if(err) {
            res.status(500).json({message: ['Что-то не так с сервером MySql']});
        }
        else {
            res.status(200).json({message: []});
        }
    })
});

module.exports = router;
