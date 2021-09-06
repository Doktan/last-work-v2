import React, {useState, useEffect} from 'react';
import style from '../../styles/order.module.css';
import * as axios from 'axios';

const AddOrder = (props) => {

    const[text, setText] = useState('');
    const[price, setPrice] = useState('');
    const[disable, setDisable] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/order/create',{order_info: text, summ: price})
        .then(res => {
            props.setError(res.data.message);
            props.setUpdateTable(true);
        })
        .catch(err => {
            console.log(err.response);
            props.setError(err.response.data.message);
        })
    };

    useEffect(()=>{
        if(!(price && text)) {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    },[price,text]);

    return(
        <div className={style.container}>
            Добавить заказ
            <form className={style.forForm} onSubmit={handleSubmit}>
                Состав заказа
                <textarea className={style.priceArea} maxLength='100' onChange={(e)=>{setText(e.target.value)}}>
                </textarea>
                <input id={style.input} placeholder='Стоимость заказа'
                 type='text' onChange={(e)=>{setPrice(e.target.value);}}></input>
                <button type='submit' disabled={disable}>Добавить</button>
            </form>
        </div>
    );
};

export default AddOrder;
