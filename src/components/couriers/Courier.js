import * as axios from 'axios';
import React, {useState, useEffect} from 'react';
import ErrorHandler from '../ErrorHandler';
import ResultTable from '../ResultTable';
import CourierShipping from './CourierShipping';
import CourierTable from './CourierTable';
import style from '../workers/worker.module.css';

const Courier = (props) => {
    
    const url = '/api/cour/';

    const[CourierData, setCourierData] = useState([]);
    const[errorText, setError] = useState([]);
    const[updateTable, setUpdateTable] = useState(true);
    const[workers, setWorkers] = useState([])
    const[freeWorkers, setFree] = useState([]);
    const[showTable, setShow] = useState(false);
    const[Data, setData] = useState([]);
    // const[keys, setKeys] = useState(Object);

    useEffect(()=>{
        if(updateTable){
            console.log('couriers');
            axios.get(url+'get')
            .then(res=>{
                setCourierData(res.data);
                setUpdateTable(false);
                axios.get(url+'couriers')
                .then(res => {
                    console.log(res.data);
                    setWorkers(res.data);
                    axios.get(url+'getFree')
                    .then(res => {
                        // console.log(res.data);
                        // console.log(Object.keys(res.data[0]))
                        setFree(res.data);
                        // setKeys(Object.keys(res.data[0]))
                    })
                })
            })
        } 
    },CourierData, props.OrderData, workers);
    // const initialTable = () => {
    //     for(let i = 0 ; i < props.OrderData.length ; i++){
    //         CourierData[i] = (props.OrderData[i].id_order);
    //     }
    //     axios.post(url+'initiate',{data: CourierData})
    //         .then(res => {
    //             console.log('res');
    //             setUpdateTable(true);
    //         })
    //         .catch(err => {
    //             console.log(err.response)
    //         })
    // };

    const test = () => {
        axios.get(url+'getFree')
        .then(res => {
            // console.log(res.data);
            // console.log(Object.keys(res.data[0]))
            setFree(res.data);
            // setKeys(Object.keys(res.data[0]))
        })
    }
 
    const InShipping = (e) => {
        axios.get(url+'shipping')
        .then(res => {
            setData(res.data);
            setShow(true);
        });
    };

    const reset = (e) => {
        setShow(false);
        setData([]);
    };

    return(
        <div className={style.container} >
            <CourierTable CourierData={CourierData} StaffData={props.StaffData} workers={workers}/>
            {/* <button onClick={initialTable}>Создать первичные данные</button> */}
            Свободные курьеры
            <ResultTable Data={freeWorkers} />
            <div className={style.cool}>
                <div className={style.buttons}>
                    <button onClick={InShipping} title='Показывает заказы, которые в пути'>Что доставляется</button>
                    <button onClick={reset}> Сброс </button>
                </div>
            <CourierShipping showTable={showTable} Data={Data}/>
            </div>
        </div>
    );
};

export default Courier;
