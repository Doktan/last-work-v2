const { Router } = require("express");
const router = Router();
const connection = require("../server");

// /api/order
// order_info summ

router.post('/create', (req,res)=>{
    const body = req.body;
    console.log(body);
    let price = body.summ;
    const order_info = body.order_info;
    price = price.replace(/\s/g,'');
    if(price.match(/[^0-9]/)) {
        return res.status(500).json({message: ['Цена содержит неккоректные символы!']});
    }
    else{
        const query = 'INSERT INTO orders (order_info, summ) VALUES (?, ?)';
        connection.query(query,[order_info,price], (err,resul,fields) => {
            // console.log(resul);
            const query1 = 'INSERT INTO couriers (id_order, delivery_status) VALUES (?,?)';
            connection.query(query1,[resul.insertId,'Ожидает курьера'],(error,results,fiel)=>{
                return res.status(200).json({message: []});
            })
            // const query1 = 'INSERT INTO couriers (id_order) VALUES'
        });
    }
});

router.get('/get', (req,res)=>{
    const query = 'SELECT * FROM orders';
    connection.query(query,(err,result,fields)=>{
       return res.status(200).send(result);
    });
});

router.post('/delete', (req,res)=>{
    const id = req.body.id;
    console.log(id);
    const courierQuery = 'DELETE FROM couriers WHERE id_order = ?';
    connection.query(courierQuery, id, (err,result,fields)=>{
        console.log(err);
        const query = 'DELETE FROM orders WHERE id_order = ?';
        connection.query(query, id, (err,result,fields)=>{
            console.log(err);
            return res.status(200).json({message: []});
        });
    })
});

router.post('/update', (req,res)=>{
    const body = req.body;
    const order_info = body.order_info;
    let summ = body.summ;
    const id_order = body.id_order;
    summ = summ.replace(/\s/g,'');
    if(summ.match(/[^0-9]/g)) {
        return res.status(500).send(['Цена содержит неккоректные символы!']);
    }
    const query = 'UPDATE orders SET order_info = ?, summ = ? WHERE id_order = ?';
    connection.query(query, [order_info,summ, id_order], (err,results,fields)=>{
        return res.status(200).send([]);
    })
});

module.exports = router;
