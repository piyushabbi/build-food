import React, { Component } from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	state = {
		ingredients: {
			meat: 1,
			cheese: 1,
			bacon: 3,
			salad: 1
		}
	};
	render() {
		return (
			<div>
				<CheckoutSummary ingredients={this.state.ingredients} />
			</div>
		);
	}
}

export default Checkout;
