import { render } from '@testing-library/react';
import React from 'react';

const WorkerView = (props) => {
    return (
        <div>
            {/* {!props.Data ?  
                null
            :                
         <tr>
            <td>Номер рабочего</td>
            <td>ФИО</td>
            <td>Телефон</td>
            <td>Отдел</td>
            <td>Должность</td>
        </tr>} */}
            { props.showTable &&
                <tr>
                    <td>Номер рабочего</td>
                    <td>ФИО</td>
                    <td>Телефон</td>
                    <td>Отдел</td>
                    <td>Должность</td>
                </tr>
            }
            {props.Data.map(i => {
                return (
                    <tr>
                        <td>{i.id_worker}</td>
                        <td>{i.name}</td>
                        <td>{i.telephone}</td>
                        <td>{i.id_dep}</td>
                        <td>{i.id_job}</td>
                    </tr>
                )
            })}
        </div>
    );
}

export default WorkerView;
