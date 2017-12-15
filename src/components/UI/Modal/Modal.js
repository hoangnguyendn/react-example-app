import React from 'react'
import classCSS from './Modal.css';
const modal = (props) => (
    <div className={classCSS.Modal}>
        {props.children}
    </div>
);

export default modal;