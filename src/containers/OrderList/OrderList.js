import React, {Component} from 'react';
import axios from '../../axios-orders';
import classCSS from './OrderList.css';
import Loader from '../../components/UI/Loader/Loader';

class OrderList extends Component {
    state = {
        list: []
    };

    componentDidMount() {
        axios.get('/orders.json').then(res => {
            let list = res.data;
            list = Object.keys(list).map(l => {
                return list[l];
            });
            this.setState({list: list});
            //console.log(this.state.list);
        })
    }

    render() {
        let list = (
            <div>
                <div className={classCSS.OrderList}><Loader/></div>
                <div className={classCSS.OrderList}><Loader/></div>
            </div>


        );
        if (this.state.list.length > 0) {
            list = this.state.list.map((l, index) => {
                return (
                    <div key={index} className={classCSS.OrderList}>
                        <h3>{l.customer.name}</h3>
                        <div>
                            {l.ingredients.salad > 0 ? <span>Salad: {l.ingredients.salad}</span> : null}
                            {l.ingredients.bacon > 0 ? <span>Bacon: {l.ingredients.bacon}</span> : null}
                            {l.ingredients.cheese > 0 ? <span>Cheese: {l.ingredients.cheese}</span> : null}
                            {l.ingredients.meat > 0 ? <span>Meat: {l.ingredients.meat}</span> : null}
                            <h4>Total Price: {l.price.toFixed(2)} $</h4>
                        </div>
                    </div>
                );
            });
        }
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Order List</h1>
                {list}
            </div>
        );
    }
}


export default OrderList;