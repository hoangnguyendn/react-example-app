import React from 'react';
import classCSS from './Backdrop.css'

const backdrop = (props) => {
    return (
        props.show ?
            <div className={classCSS.Backdrop}
                 onClick={props.clicked}>
            </div> : null
    );
};


export default backdrop;