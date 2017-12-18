import React from 'react';
import classCSS from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className={classCSS.Toolbar}>
            <div className={classCSS.Logo}>
                <Logo/>
            </div>
            <div className={classCSS.MobileOnly}>
                <div className={classCSS.menu} onClick={props.menu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <nav className={classCSS.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
};

export default toolbar;