import React, {useState, useEffect} from 'react';
import style from '../workers/worker.module.css'
import DepTable from './tables/DepTable';
import * as axios from 'axios';
import ErrorHandler from '../ErrorHandler';
import DelForm from './forms/DelFormDep';
import DepCreateForm from './forms/DepCreateForm';
import Jobs from './Jobs';
import Workers from '../workers/Workers';
import {Switch, Route} from 'react-router';

const Departments = (props) => {

const [move, setMove] = useState(true);
const [dName, setDepName] = useState('');
const [errorText, setError] = useState([]);
const [buttonDis, setButton] = useState(true);
const [select, setSelect] = useState();

const handleChangeDepName = (event) => {
    setDepName(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/dep/create', {dName: dName})
        .then( response => {
            setError(response.data.message);
            setDepName('');
            setMove(true);
        })
        .catch( error => {
            if(error) {
                console.log(error.response);
                setError(error.response.data.message);
                setMove(false);
            }
        });
};

const deleteDepart = (event) => {
    event.preventDefault();
    console.log("delete");
    console.log(select);
    axios.post('/api/dep/delete',{data: select})
        .then( response => {
            console.log(response);
            setMove(true);
            setSelect(-1);
            setButton(true);
        })
        .catch( error => {
            console.log(error.response)
            setMove(false);
        });
}

const handleSelect = (event) => {
    let value = event.target.value;
    if(value == -1) {
        setButton(true);
    }
    else{
        setButton(false);
    }
    setSelect(value);
}

useEffect(() => {
    if(move) {
        axios.get('/api/dep/get')
            .then(response => {
                props.setDepData(response.data);
            });
        setMove(false);
    }
});

    return(
        <div className={style.container}>
            <DepTable data={props.DepData}/>
            {/* <Switch>
                <Route path='/bruh'>
                    <DepTable data={data}/>
                </Route>
            </Switch> */}
            <DepCreateForm handleSubmit={handleSubmit} 
            handleChangeDepName={handleChangeDepName}/>
            <DelForm deleteDepart={deleteDepart} handleSelect={handleSelect}
             data={props.DepData} buttonDis={buttonDis} />
            <ErrorHandler errorText={errorText}/>
            {/* <Jobs deps={data} />
            <Workers deps={data}/> */}
        </div>
    );
};

export default Departments;
