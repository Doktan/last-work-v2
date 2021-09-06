const { Router } = require("express");
const router = Router();
const connection = require("../server");

// /api/cour

router.get('/get', (req,res)=>{
    const query = 'SELECT * FROM couriers';
    connection.query(query, (err,results,fields)=>{
        res.status(200).send(results);
    });
});

router.post('/initiate', (req,res)=>{
    const body = req.body.data;
    console.log(body);
    const query = 'INSERT INTO couriers (id_order) VALUES (?)';
    for(let i = 0 ; i < body.length; i++) {
        connection.query(query, body[i], (err,results,fields)=>{
            console.log('ok');
        })
    }
});

router.get('/couriers', (req,res)=>{
    const query = "select id_worker, name from workers where id_job in (select id_job from jobs where job_name = 'Курьер')";
    connection.query(query,(err,results,fields)=>{
        // console.log(results);
        res.status(200).send(results);
    });
});

router.post('/setCourier',(req,res)=>{
    const id_worker = req.body.id_worker;
    const id_order = req.body.id_order;
    console.log('setCourier ',req.body);
    const query = 'UPDATE couriers SET id_worker = ?, delivery_status = ? WHERE id_order = ?';
    if(id_worker == -1) {
        console.log('right place')
        const newQuery = 'UPDATE couriers SET delivery_status = ? WHERE id_order = ?';
        connection.query(query,['Ожидает доставки',id_order],(err,results,fields)=>{
            console.log(err);
            return res.status(500).send();
        })
    }
    else {
        connection.query(query,[id_worker,'В пути',id_order],(err,results,fields)=>{
            return res.status(200).send();
        });
    }
});

router.get('/getFree', (req,res)=> {
    const query = "SELECT name, id_worker  from workers WHERE id_worker not in (SELECT id_worker from  couriers WHERE id_worker is not NULL GROUP BY id_worker) and id_job = 1";
    connection.query(query, (err,results,f)=>{
        console.log(results);
        return res.status(200).send(results);
    })
    
})

router.get('/shipping',(req,res)=>{
    const query = `select c.id_courier, c.id_worker , w.name, o.order_info  from couriers c 
    JOIN
    workers w
    ON
    w.id_worker = c.id_worker
    JOIN
    orders o
    ON
    o.id_order = c.id_order
    where c.id_worker is not NULL`
    connection.query(query,(err,r,f)=>{
        return res.status(200).send(r);
    });
});

module.exports = router;
