import React from 'react';

const JobCreate = (props) => {
    return(
        <div>
            Добавить должность
            <form type="submit" onSubmit={props.handleSubmit}>
                <input type='text' onChange={props.handleAddName} placeholder='Должность'></input>
                <select onChange={props.handleAddSelect}>
                    <option selected value='-1' >Выберите отдел</option>
                    {props.deps.map( dep => {
                        return(
                            <option value={dep.id_department}>{dep.d_name}</option>
                        );
                    })}
                </select>
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default JobCreate;
