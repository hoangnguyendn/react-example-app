import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import classCSS from './Layout.css';
import Toolbal from '../Navigation/Toolbar/Toolbar';
import SiteDrawer from '../SiteDrawer/SiteDrawer';

class Layout extends Component {

    state = {
        showSiteDrawer: false
    };

    sideDrawerHandler = () => {
        this.setState((prevState) => {
                return {showSiteDrawer: !prevState.showSiteDrawer}
            }
        );
    };

    render() {
        return (
            <Aux>
                <Toolbal menu={this.sideDrawerHandler}>
                </Toolbal>
                <SiteDrawer open={this.state.showSiteDrawer}
                            closed={this.sideDrawerHandler}
                            type={this.state.showSiteDrawer ? 'Open' : 'Close'}/>
                <main className={classCSS.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}


export default Layout;