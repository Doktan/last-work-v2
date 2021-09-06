import React, {useState, useEffect} from 'react';
import AttendCreate from './AttendCreate';
import AttendTable from './AttendTable';

const Attend = (props) => {
    // const []
    return(
        <div>
            <AttendTable data={[]}/>
            <AttendCreate data={props.data}/>
        </div>
    );
}

export default Attend;
