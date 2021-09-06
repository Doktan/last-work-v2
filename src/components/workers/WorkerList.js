import React, {useState, useEffect} from 'react';
import WorkerUpdate from './WorkerUpdate';
import * as axios from 'axios';

const WorkerList = (props) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [disable, setDisable] = useState(true);

    const handleShow = (e) => {
        const id_worker = e.target.value;
        if(id_worker == -1) {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
        axios.post('/api/worker/getById',{id_worker: id_worker})
            .then(response => {
                setData(response.data);
            });
        }

    return(
        <div>
            Обновить сотрудника
            <br />
            <select onChange={handleShow}>
                <option value='-1' >Выберите сотрудника</option>
                {props.data.map(worker => {
                    return(
                        <option value={worker.id_worker}>{worker.name}</option>
                    );
                })}
            </select>
            <WorkerUpdate data={data} deps={props.deps} jobs={props.jobs}
            prepareJob={props.prepareJob} getJobs={props.getJobs} setMove={props.setMove}
            sendJobId={props.sendJobId} sendDepId={props.sendDepId} disable={disable}/>
        </div>
    );
};

export default WorkerList;
