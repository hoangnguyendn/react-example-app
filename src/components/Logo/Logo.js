import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import classCSS from './Logo.css';

const logo = (props) => (
    <div className={classCSS.Logo}>
        <img src={burgerLogo} alt="Burger"/>
    </div>
);

export default logo;