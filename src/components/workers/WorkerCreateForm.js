import React from 'react';

const WorkerCreate = (props) => {
    return(
        <div>
            Добавить сотрудника
            <form onSubmit={props.hanldeSubmit} type="submit">
                <input type="text" placeholder="ФИО" onChange={props.handleName}></input>
                <input type="text" placeholder="телефон" onChange={props.handleTelephone}></input>
                <select onChange={props.getJobs}>
                    <option value='-1' >Выберите отдел</option>
                    {props.deps.map(dep => {
                        return(
                            <option value={dep.id_department}>{dep.d_name}</option>
                        );
                    })}
                </select>
                <select onChange={props.prepareJob} >
                    <option value='-1'>Выберите должность</option>
                    {props.jobs.map( job => {
                        return(
                            <option value={job.id_job}>{job.job_name}</option>
                        );
                    })}
                </select>
                <button type="submit">Добавить</button>
            </form>            
        </div>
    );
};

export default WorkerCreate;
