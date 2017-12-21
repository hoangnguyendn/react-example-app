import React from 'react';
import classCSS from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classCSS.NavigationItem}>
        <NavLink exact to={props.link}
        activeClassName={classCSS.active}>
            <b>{props.children}</b>
        </NavLink>
    </li>
);


export default navigationItem;