import React from 'react';

const StatusTable = (props) => {
    return(
        <div>
        Таблица состояний сотрудников
        <table>
            <tr>
                <td>Id</td>
                <td>Id работника</td>
                <td>Состояние</td>
            </tr>
        {props.data.map(staff => {
            return(
                <tr>
                    <td>{staff.id_status}</td>
                    <td>{staff.id_staff}</td>
                    <td>{staff.st_state}</td>
                </tr>
            );
        })}
        </table>
    </div>
    );
};

export default StatusTable;
