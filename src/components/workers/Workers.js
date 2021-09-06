import React, {useContext, useEffect, useState} from "react";
import style from './worker.module.css';
import * as axios from "axios";
import WorkerTable from "./WorkerTable";
import ErrorHandler from "../ErrorHandler";
import WorkerDel from '.././departments/forms/WorkerDelForm'
import WorkerCreate from "./WorkerCreateForm";
import WorkerList from "./WorkerList";
import Attend from "../attendance/Attend";
import Status from "../status/StaffStatus";
import ContextTest from '../../ContextTest';
import WorkerView from "./WorkerView";

const Workers = (props) => {

    const [name,  setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [errorText, setError] = useState([]);
    const [move, setMove] = useState(true);
    const [deleteId, setDeleteId] = useState("");
    const [jobs, setJobs] = useState([]);
    const [sendDepId, setDepId] = useState();
    const [sendJobId, setJobId] = useState();
    const [Data, setData] = useState([]);
    const [showTable, setShow] = useState(false);

    const handleDeleteId = (event) => {
        setDeleteId(event.target.value);
    };

    const handleDelete = (event) => {
        event.preventDefault();
        axios.post('/api/worker/delete',{id: deleteId})
            .then(response => {
                console.log(response);
                setError(response.data.message);
                setMove(true)
                setDeleteId('');
            })
            .catch(error => {
                setError(error.response.data.message);
            })
    }
 
    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleTelephone = (event) => {
        setTelephone(event.target.value);
    }

    async function hanldeSubmit(event){
        event.preventDefault();
        console.log('id_job: ', sendJobId);
        console.log('id_dep: ', sendDepId);
        await axios
        .post('/api/worker/createWorker',{name:name, telephone: telephone, id_dep: sendDepId, id_job: sendJobId})
        .then(response => {
            console.log(response);
            setError(response.data.message);
            setMove(true);
            setName('');
            setTelephone('');
        })
        .catch(error => {
            console.log(error.response);
            setError(error.response.data.message);
        })
    }

    useEffect(() => {
        if(move){
            getWorkers();
            setMove(false);
        }
       
    })

    function getWorkers() {
         axios.get('/api/worker/get')
        .then(response => {
            props.setStaffData(response.data);
        })
    }

    const getJobs = (e) => {
        const id_dep = e.target.value;
        setDepId(e.target.value);
        if(id_dep !== -1) {
            console.log(id_dep);
            axios.post('/api/job/getByDep',{data: id_dep})
                .then( response => {
                    setJobs(response.data)
                });
        }
    }

    const prepareJob = (e) => {
        setJobId(e.target.value);
     };

     const prepareView = (e) => {
        axios.get('/api/worker/view')
        .then(res =>{
            setShow(true);
            setData(res.data);
        });
     };

     const prepareSort = (e) => {
        axios.get('/api/worker/sort')
        .then(res => {
            setShow(true);
            setData(res.data);
        });
     };

     const becomeNull = () => {
         setShow(false);
        setData([]);
     };

     const allEven = (e) => {
         axios.get('/api/worker/sortModEven')
         .then( res => {
            setShow(true);
            setData(res.data);
         });
    };

    const allOdd = (e) => {
        axios.get('/api/worker/sortModOdd')
        .then( res => {
           setShow(true);
           setData(res.data);
        });     
    };

    return(
        <div className={style.container}>
            <WorkerTable data={props.StaffData}/>
            <WorkerCreate hanldeSubmit={hanldeSubmit} handleName={handleName}
            handleTelephone={handleTelephone} getJobs={getJobs}
            deps={props.DepData} prepareJob={prepareJob} jobs={jobs}/>
            <WorkerDel handleDelete={handleDelete} handleDeleteId={handleDeleteId} />
            <WorkerList data={props.StaffData} deps={props.DepData} jobs={jobs}
            prepareJob={prepareJob} getJobs={getJobs} setMove={setMove} sendDepId={sendDepId}
            sendJobId={sendJobId}/>
            <ErrorHandler errorText={errorText}/>
            <div className={style.cool}> 
                <div className={style.buttons}>
                    <button onClick={prepareView} title ='Показывает таблицу в более удобном для читателя виде'>
                        Удобный вид</button>
                    <button onClick={prepareSort} title='Сортировка по алфавиту по фамилиям'>
                        Сортировка</button>
                    <button onClick={allEven}>
                        Все четные
                    </button>
                    <button onClick={allOdd}>
                        Все нечетные
                    </button>
                    <button onClick={becomeNull} title='Сбросить данные таблицы'>
                        Сброс
                    </button>
                </div>
                {/* <p className={style.centerText}>Вывод</p> */}
              <WorkerView Data={Data} showTable={showTable}/>
            </div>
            {/* <Attend data={data}/>
            <Status/>  */}
        </div>
    );
};

export default Workers;
