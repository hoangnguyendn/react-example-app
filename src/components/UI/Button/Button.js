import React from 'react';
import classCSS from './Button.css';

const Button = (props) => {
    return (
        <button className={[classCSS.Button, classCSS[props.action]].join(' ')}
                onClick={props.clicked}>
            {props.children}
        </button>
    );
};


export default Button;