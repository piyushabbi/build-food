import React, { Component } from 'react';
import axios from '../../../axios.orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class CheckoutData extends Component {
	state = {
		orderData: {
			name: '',
			street: '',
			country: '',
			pincode: '',
			email: '',
			deliveryMethod: ''
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
				name: this.state.orderData.name,
				address: {
					street: this.state.orderData.street,
					country: this.state.orderData.country,
					pincode: this.state.orderData.pincode
				},
				email: this.state.orderData.email
			},
			deliveryMethod: this.state.orderData.deliveryMethod
		};
		// alert(JSON.stringify(order, undefined, 2));
		axios
			.post('/orders.json', order)
			.then(res => {
				console.log(res);
				this.setState({ isLoading: false });
				this.props.history.push('/');
			})
			.catch(err => console.log(err));
	};

	changehandler = e => {
		const updatedOrderData = { ...this.state.orderData };
		// updatedOrderData[e.target.name] = e.target.value;
		this.setState({
			orderData: {
				...updatedOrderData,
				[e.target.name]: e.target.value
			}
		});
	};

	render() {
		if (this.state.isLoading === true) {
			return <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form onSubmit={this.orderHandler}>
					<Input
						inputtype="input"
						name="name"
						label="Name"
						placeholder="Your Name"
						value={this.state.orderData.name}
						changehandler={this.changehandler}
					/>
					<Input
						inputtype="input"
						type="email"
						name="email"
						label="Email"
						placeholder="Your Email"
						value={this.state.orderData.email}
						changehandler={this.changehandler}
					/>
					<Input
						inputtype="input"
						name="street"
						label="Street"
						placeholder="Your Street"
						value={this.state.orderData.street}
						changehandler={this.changehandler}
					/>
					<Input
						inputtype="input"
						name="country"
						label="Country"
						placeholder="Your Country"
						value={this.state.orderData.country}
						changehandler={this.changehandler}
					/>
					<Input
						inputtype="input"
						name="pincode"
						label="Postal Code"
						placeholder="Your Postal Code"
						value={this.state.orderData.pincode}
						changehandler={this.changehandler}
					/>
					<Input
						inputtype="select"
						name="deliveryMethod"
						label="Your Delivery Type"
						options={['Cheapest', 'Fastest']}
						value={this.state.orderData.deliveryMethod}
						changehandler={this.changehandler}
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
