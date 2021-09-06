import React, {useState, useEffect} from 'react';
import style from './worker.module.css';

const WorkerTable = (props) => {
    return(
        <div className={style.test}>
            <table>
                <tr>
                    <td>Номер сотрудника</td>
                    <td>Имя</td>
                    <td>Телефон</td>
                    <td>Номер отдела</td>
                    <td>Номер должности</td>
                </tr>
                {props.data.map(worker =>{
                    return(
                    <tr key = {worker.id_worker}>
                        <td>{worker.id_worker}</td>
                        <td>{worker.name}</td>
                        <td>{worker.telephone}</td>
                        <td>{worker.id_dep}</td>
                        <td>{worker.id_job}</td>
                    </tr>
                    )
                })}
            </table>   
        </div>
    )
}

export default WorkerTable;
