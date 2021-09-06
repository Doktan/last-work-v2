import React from 'react';

const ErrorHandler = (props) => {
    return(
        <ul>
            {props.errorText.map(i =>{
                return(
                    <li>{i}</li>
                )
            })}
        </ul>
    );
};

export default ErrorHandler;
