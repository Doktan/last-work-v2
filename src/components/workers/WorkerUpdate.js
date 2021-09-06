import React, {useState} from 'react';
import * as axios from 'axios';

const WorkerUpdate = (props) => {
      const [newName,setName] = useState('');
      const [newTelephone, setTel] = useState('');


    const handleUpdate = (e) => {
        e.preventDefault();
        axios.post('/api/worker/update',{newName: newName, newTelephone: newTelephone,
            newDep: props.sendDepId, newJob: props.sendJobId, address: props.data
        })
        .then(response => {
            console.log(response);
            props.setMove(true);
        })
    }

    return(
        <div>
            Примечание: если оставить окно пустым, то оно не изменится
            <form onSubmit={handleUpdate}>
                <input type='text' placeholder="ФИО" onChange={(e)=>setName(e.target.value)}></input>
                <input type='text' placeholder="Тел."onChange={(e)=>setTel(e.target.value)}></input>
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
                <button type="submit" disabled={props.disable}>Обновить</button>
            </form>
        </div>
    );
}

export default WorkerUpdate;
