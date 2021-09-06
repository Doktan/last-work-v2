import React, {useEffect, useState} from 'react';
import ErrorHandler from '../ErrorHandler';
import AddOrder from './AddOrder';
import OrdersTable from './OrdersTable';
import * as axios from 'axios';

const Orders = (props) => {

    const [updateTable, setUpdateTable] = useState(true);
    const [errorText, setError] = useState([]);

    // useEffect(()=>{

    //     console.log('update table');

    // },updateTable);

    useEffect(()=>{
        if(updateTable){
            console.log('get orders')
            axios.get('/api/order/get')
            .then(res => {
                props.setOrderData(res.data);
                setUpdateTable(false);
            });
        }
    });

    return(
        <div>
            <OrdersTable data={props.OrderData} setUpdateTable={setUpdateTable} setError={setError}/>
            <AddOrder  setError={setError} setUpdateTable={setUpdateTable}/>
            <ErrorHandler errorText={errorText}/>
        </div>
    );
};

export default Orders;