import React, { Component } from 'react';
import Order from '../../components/Orders/Order';
import axios from '../../axios.orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};
	componentDidMount() {
		axios
			.get('/orders.json')
			.then(res => {
				const fetchOrders = [];
				for (let key in res.data) {
					fetchOrders.push({
						...res.data[key],
						id: key
					});
				}
				this.setState({
					loading: false,
					orders: fetchOrders
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				))}
			</div>
		);
	}
}

export default WithErrorHandler(Orders, axios);
