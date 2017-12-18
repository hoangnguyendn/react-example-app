import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import classCSS from './SiteDrawer.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux';

const siteDrawer = (props) => {
    return (
        <Aux>
            <Backdrop show={props.open}
                      clicked={props.closed}/>
            <div className={[classCSS.SiteDrawer, classCSS[props.type]].join(' ')}>
                <div className={classCSS.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
};


export default siteDrawer;