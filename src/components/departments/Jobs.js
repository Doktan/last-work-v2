import React, {useState, useEffect} from 'react';
import style from '../workers/worker.module.css';
import JobsTable from '../departments/tables/JobsTable';
import ErrorHandler from '../ErrorHandler';
import * as axios from 'axios';
import Workers from '../workers/Workers';
import JobDel from './forms/JobDelForm';
import JobCreate from './forms/JobCreateForm';


// название работы - name
// номер отдела - d_num

const Jobs = (props) => {

    const url = '/api/job/';

    const [errorText, setError] = useState([]);
    const [move, setMove] = useState(true);
    const [disable, setDisable] = useState(true);
    const [addSelect, setAddSelect] = useState();
    const [name, setName] = useState('');
    const [jobId, setJobId] = useState();

    useEffect(() => {
        if(move){
            axios.get(url+'get')
            .then(response => {
                props.setJobData(response.data);
            });
            setMove(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("создать")
        axios.post('/api/job/create',{name: name, d_num: addSelect})
            .then(response => {
                setError([]);
                setMove(true);
            })
            .catch(error => {
                console.log(error.response.data);
                setError(error.response.data.message);
                setMove(false);
            });
    }

    const handleAddSelect = (e) => {
        setAddSelect(e.target.value);
    }

    const handleAddName = (e) => {
        setName(e.target.value);
    }

    const deleteJob = (e) => {
        e.preventDefault();
        axios.post(url+'delete', {jobId: jobId})
            .then(response => {
                setJobId(-1);
                setDisable(true);
                setMove(true);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    const handleJobDelete = (e) => {
        let value = e.target.value;
        if(value == -1) {
            setDisable(true);
        }
        else{
            setDisable(false);
        }
        setJobId(value);
    }

    return(
        <div className={style.table}>
            <JobsTable data={props.JobData}/>
            <JobCreate handleSubmit={handleSubmit} handleAddName={handleAddName}
                handleAddSelect={handleAddSelect} deps={props.DepData}/>
            <JobDel deleteJob={deleteJob} handleJobDelete={handleJobDelete} 
                data={props.JobData} disable={disable} />
            <ErrorHandler errorText={errorText}/>
            {/* <Workers deps={props.deps} jobs={data}/> */}
        </div>
    )
};

export default Jobs;
