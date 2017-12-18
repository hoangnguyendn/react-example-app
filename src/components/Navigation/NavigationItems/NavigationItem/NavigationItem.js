import React from 'react';
import classCSS from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classCSS.NavigationItem}>
        <a href={props.link}
           className={props.active ? classCSS.active : null}>
            <b>{props.children}</b>
        </a>
    </li>
);


export default navigationItem;