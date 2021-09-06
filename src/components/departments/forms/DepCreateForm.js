import React from 'react';

const DepCreateForm = (props) => {
    return(
        <div>
            Добавить отдел
            <form type="submit" onSubmit={props.handleSubmit}>
                <input type="text" onChange={props.handleChangeDepName}></input>
                <button>Добавить</button>
            </form>
        </div>
    );
};

export default DepCreateForm;
