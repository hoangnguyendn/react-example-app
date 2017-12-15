import React from 'react';
import Aux from '../../hoc/Aux'
import classCSS from './Layout.css';
const layout = (props) => (
    <Aux>
        <div>
            Toolbar, SideDrawer, Backdrop
        </div>
        <main className={classCSS.Content}>
            {props.children}
        </main>
    </Aux>
);


export default layout;