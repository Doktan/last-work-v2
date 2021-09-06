import React, { useState, useEffect } from 'react';
import './App.css';
import Departments from './components/departments/Departments';
import Jobs from './components/departments/Jobs';
import Workers from './components/workers/Workers';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import styles from './styles/grid.module.css';
import * as axios from 'axios';
import Orders from './components/orders/Orders';
import Footer from './components/Footer';
import Courier from './components/couriers/Courier';



  const App = () => {

    const [DepData, setDepData] = useState([]);
    const [JobData, setJobData] = useState([]);
    const [StaffData, setStaffData] = useState([]);
    const [OrderData, setOrderData] = useState([]);
    const [move, setMove] = useState(true);

    useEffect( () => {
      console.log("test1");
        if(move) {
          axios.get('/api/dep/get')
              .then(response => {
                  setDepData(response.data);
              });
          axios.get('/api/order/get')
              .then(res=>{
                setOrderData(res.data);
              })
          axios.get('/api/worker/get')
              .then(res=>{
                setStaffData(res.data);
              })
          setMove(false);
      }
    }, move);

    return(
      <div>
        <Router>
        <NavBar/>
            <div className={styles.container}>
              <Route path='/dep'>
                <Departments setDepData={setDepData} DepData={DepData}/>
              </Route>
              <Route path='/jobs'>
                <Jobs setJobData={setJobData} JobData={JobData} DepData={DepData}/>
              </Route>
              <Route path='/staff'>
                <Workers setStaffData={setStaffData} StaffData={StaffData}
                JobData={JobData} DepData={DepData}/>
              </Route>
              <Route path='/orders'>
                <Orders OrderData={OrderData} setOrderData={setOrderData}/>
              </Route>
              <Route path='/couriers'>
                <Courier OrderData={OrderData} StaffData={StaffData}/>
              </Route>
              <Route exact path='/'>
                Главная
              </Route>
            </div>
        <Footer/>
        </Router>
      </div>
    );
  }

export default App;
