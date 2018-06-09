import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactData from './CheckoutData/CheckoutData';

class Checkout extends Component {
	state = {
		ingredients: {
			meat: 1,
			cheese: 1,
			bacon: 3,
			salad: 1
		}
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		for (let params of query.entries()) {
			ingredients[params[0]] = +params[1];
		}
		this.setState({ ingredients });
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinue={this.checkoutContinueHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData}
				/>
			</div>
		);
	}
}

export default Checkout;
