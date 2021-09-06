import React, {useState, useEffect} from 'react';
import * as axios from 'axios';
import style from '../workers/worker.module.css';

const CourierTable = (props) => {

    const handleChange = (e) => {
        // console.log(e.target.value);
        // console.log(e.target.value.match(/[0-9-]*/)[0]);
        // console.log(e.target.value.match(/[^,]*$/)[0]);
        let id_worker = e.target.value.match(/[0-9-]*/)[0];
        let id_order = e.target.value.match(/[^,]*$/)[0];
        axios.post('/api/cour/setCourier', {id_worker: id_worker, id_order: id_order})
        .then(res => {
            window.location.reload(); 
        })
        .catch(err => {
            console.log(err.response)
        })
    };

    return(
        <div className={style.test}>
            <tr>
                <td>Номер доставки</td>
                <td>Номер заказа</td>
                <td>Номер курьера</td>
                <td>Статус доставки</td>
            </tr>
            {props.CourierData.map(i => {
                return(
                    <tr key={i.id_courier}>
                        <td>{i.id_courier}</td>
                        <td>{i.id_order}</td>
                        {/* <td>{i.id_worker}</td> */}
                        <td onChange={handleChange} >
                            <select>
                                <option value={i.id_worker+','+i.id_order} >{i.id_worker}</option>
                                {props.workers.map(work => {
                                    return(
                                        <option value={work.id_worker+','+i.id_order}>{work.id_worker}</option>
                                    );
                                })}
                            </select>
                        </td>
                        <td>{i.delivery_status}</td>
                        {/* <td>
                            <select>
                                    <option>{i_delivery_status}</option>
                            </select>
                        </td> */}
                    </tr>
                );
            })}
        </div>
    ); 
}

export default CourierTable;
