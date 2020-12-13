import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as action from '../../Store/actions/index';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    componentDidMount() {
        this.props.onfetchOrders();
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToprops = dispatch => {
    return {
        onfetchOrders: () => dispatch(action.fetchOrders())
    };
};

export default connect(mapStatetoProps, mapDispatchToprops)(withErrorHandler(Orders, axios));