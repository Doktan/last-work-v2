import React from 'react';

const DepTable = (props) => {
    return(
        <div>
            <table>
            <tr>
                <td>Id отдела</td>
                <td>Название отдела</td>
            </tr>
            {props.data.map(i => {
                return(
                    <tr>
                        <td>{i.id_department}</td>
                        <td>{i.d_name}</td>
                    </tr>
                );
            })}
        </table>
    </div>
    );
};

export default DepTable;