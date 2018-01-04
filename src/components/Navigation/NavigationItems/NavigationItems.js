import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classCSS from './NavigationItems.css';
const navigationItems = () => {
    return (
        <ul className={classCSS.NavigationItems}>
            <NavigationItem link="/">
                Burger Builder
            </NavigationItem>
            <NavigationItem link="/order-list">
                Order List
            </NavigationItem>
            <NavigationItem link="/login">
                Login
            </NavigationItem>
        </ul>
    );
};


export default navigationItems;