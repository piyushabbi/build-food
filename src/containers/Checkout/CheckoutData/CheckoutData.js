import React, { Component } from 'react';
import axios from '../../../axios.orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class CheckoutData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		isLoading: false
	};

	orderHandler = e => {
		e.preventDefault();
		this.setState({
			isLoading: true
		});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'John Doe Bhai',
				address: {
					street: 'Yemen Street',
					country: 'Yemen',
					pincode: '123456'
				},
				email: 'john@doe.com'
			},
			deliveryMethod: 'fastest'
		};
		axios
			.post('/orders.json', order)
			.then(res => {
				console.log(res);
				this.setState({ isLoading: false });
				this.props.history.push('/');
			})
			.catch(err => console.log(err));
	};

	render() {
		if (this.state.isLoading === true) {
			return <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form>
					<input
						className={classes.Input}
						type="text"
						name="name"
						placeholder="Your Name"
					/>
					<input
						className={classes.Input}
						type="email"
						name="email"
						placeholder="Your Email"
					/>
					<input
						className={classes.Input}
						type="text"
						name="street"
						placeholder="Your Street"
					/>
					<input
						className={classes.Input}
						type="text"
						name="postalCode"
						placeholder="Your Postal Code"
					/>
					<Button clicked={this.orderHandler} btnType="Success">
						Order
					</Button>
				</form>
			</div>
		);
	}
}

export default CheckoutData;