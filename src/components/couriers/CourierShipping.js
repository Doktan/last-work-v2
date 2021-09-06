import React from 'react';

const CourierShipping = (props) => {
    return(
        <div>
            {props.showTable && 
                <tr>
                    <td>Номер доставки</td>
                    <td>Номер работника</td>
                    <td>ФИО</td>
                    <td>Заказ</td>
                </tr>
            }
            {props.Data.map(i =>{
                return(
                    <tr>
                        <td>{i.id_courier}</td>
                        <td>{i.id_worker}</td>
                        <td>{i.name}</td>
                        <td>{i.order_info}</td>
                    </tr>
                )
            })}
        </div>
    );
};

export default CourierShipping;
