import React from 'react'
import classCSS from './Element.css'

const element = (props) => {
    return (
        <div className={classCSS.Element}>
            <div className={classCSS.Label}>{props.label}</div>
            <button
                className={classCSS.Less}
                onClick={props.remove}
                disabled={props.disable}>
                Less
            </button>
            <button
                className={classCSS.More}
                onClick={props.add}>
                More
            </button>
        </div>
    );
};


export default element;
