import React from 'react';

const JobDel = (props) => {
    return(
        <div>
            Удалить должность
            <form type="submit" onSubmit={props.deleteJob}>
                <select onChange={props.handleJobDelete}>
                    <option selected value='-1'>Выберите должность</option>
                    {props.data.map( job => {
                        return(
                            <option value={job.id_job}>{job.job_name}</option>
                        );
                    })}
                </select>
                <button type='submit' disabled={props.disable}>Удалить</button>
            </form>
        </div>
    );
};

export default JobDel;
