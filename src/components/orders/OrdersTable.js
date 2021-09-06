import React, {useState} from 'react';
import style from '../../styles/order.module.css';
import * as axios from 'axios';
import testStyle from '../workers/worker.module.css';

const OrdersTable = (props) => {

    const [checked, setChecked] = useState(false);

    const deleteOrder = (e) => {
        console.log('delete order num, ', e.target.value);
        axios.post('/api/order/delete', {id: e.target.value})
        .then( res => {
            props.setUpdateTable(true);
            window.location.reload(); 
        });
    }

    const changeData = (e) => {
        console.log('change order ', e.target.value);
        const order_info =  document.getElementById(e.target.value + ' info').value;
        const summ = document.getElementById(e.target.value + ' price').value;
        axios.post('/api/order/update',{order_info:order_info,summ:summ, id_order: e.target.value})
        .then(res =>{
            props.setError(res.data);
            props.setUpdateTable(true);
            setChecked(false)
        })
        .catch(err => {
            props.setError(err.response.data);
            setChecked(false);
        })
    }

    return(
        <div className={testStyle.centerText}>
            <tr>
                <td>Номер заказа</td>
                <td>Состав заказа</td>
                <td>Стоимость заказа</td>
                <td>Удалить</td>
                <td>Изменить</td>
            </tr>
                {props.data.map(i => {
                    return(
                        <tr>
                            {/* <td>{i.id_order}</td>
                            <td>{i.order_info}</td>
                            <td>{i.summ}</td> */}
                            <td>{i.id_order}</td>
                            <td><textarea id={i.id_order + ' info'} className={style.tableArea} >{i.order_info}</textarea></td>
                            <td><textarea id={i.id_order + ' price'} className={style.tableArea}>{i.summ}</textarea></td>
                            <td><input  type='checkbox' value={i.id_order} onClick={deleteOrder}></input></td>
                            <td><input type='checkbox' value={i.id_order} checked={checked} onClick={changeData}></input></td>
                        </tr>
                    );
                })}
            {/* <div className={style.redactContainer}>
                <div className={style.redact}>Вы можете изменять данные в таблицы, чтобы закрепить изменения, <br/>
                нажмите кнопку "Изменить"</div>
                <button type='submit' onSubmit={changeData} className={style.button}>Изменить</button>
            </div> */}
        </div>
    );
};

export default OrdersTable;