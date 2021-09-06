import React from 'react';

const JobsTable = (props) => {
    return(
    <div>
        <table>
            <tr>
                <td>Id должности</td>
                <td>Название должности</td>
                <td>Номер отдела</td>
            </tr>
            {props.data.map( i => {
                return(
                    <tr>
                        <td>{i.id_job}</td>
                        <td>{i.job_name}</td>
                        <td>{i.id_dep}</td>
                    </tr>
                );
            })}
        </table>
    </div>
    );
};

export default JobsTable;
