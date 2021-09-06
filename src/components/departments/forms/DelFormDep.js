import React from 'react';

const DelForm = (props) => {
    return(
        <div>
             Удалить отдел
            <form type="submit" onSubmit={props.deleteDepart}>
            <select onChange={props.handleSelect}>
                <option selected value='-1'>Выберите отдел</option> 
                {props.data.map(i => {
                    return(
                        <option value={i.id_department}>{i.d_name}</option>
                    );
                })}
            </select>
            <button type="submit" disabled={props.buttonDis}>Удалить</button>
        </form>
    </div>
    );
};

export default DelForm;
