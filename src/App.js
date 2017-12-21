import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
    state = {
        show: true
    };

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/" exact component={BugerBuilder}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
