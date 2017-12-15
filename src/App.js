import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
    render() {
        return (
            <Layout>
                <BugerBuilder></BugerBuilder>
            </Layout>
        );
    }
}

export default App;
