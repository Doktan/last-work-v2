import React from 'react';

const AttendTable = (props) => {
    return(
        <div>
            Таблица посещений
            <table>
                <tr>
                    <td>Id</td>
                    <td>Id работника</td>
                    <td>Вошел/Вышел</td>
                    <td>Дата</td>
                </tr>
            {props.data.map(staff => {
                return(
                    <tr>
                        <td>{staff.id_t}</td>
                        <td>{staff.id_worker}</td>
                        <td>{staff.stat}</td>
                        <td>{staff.t_time}</td>
                    </tr>
                );
            })}
            </table>
        </div>
    );
}

export default AttendTable;
