import React from 'react';
import style from './workers/worker.module.css';

const ResultTable = (props) => {
    return(
        <div className={style.test}>
            <tr>
                <td>Имя</td>
                <td>Номер</td>
            </tr>
                {props.Data.map(i => {
                    return(
                        <tr>
                            <td value ={i.name}> {i.name} </td>
                            <td value ={i.id_worker}> {i.id_worker} </td>
                        </tr>
                    )
                })}

        </div>
    );
};

export default ResultTable;
