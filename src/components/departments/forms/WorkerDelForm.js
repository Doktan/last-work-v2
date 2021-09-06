import React from 'react';

const WorkerDel = (props) => {
    return(
        <div>
            Удаление сотрудника
            <form type="submit" onSubmit={props.handleDelete}>
                <input type="text" placeholder="ID сотрудника" onChange={props.handleDeleteId}></input>
                <button type="submit">Удалить!</button>
            </form>
        </div>
    );
};

export default WorkerDel;
