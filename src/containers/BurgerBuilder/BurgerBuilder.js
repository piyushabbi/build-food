import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios.orders';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../actions/actions';

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchasing: false,
		isLoading: false
	};

	componentDidMount() {
		console.log(this.props);

		// axios
		// 	.get('/ingredients.json')
		// 	.then(res => {
		// 		this.setState({
		// 			ingredients: res.data
		// 		});
		// 	})
		// 	.catch(err => console.log(err));
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		let queryParams = Object.keys(this.props.ings).map(ingredient => {
			return `${encodeURIComponent(ingredient)}=${this.props.ings[ingredient]}`;
		});
		let queryString = queryParams
			.concat(`totalPrice=${this.state.totalPrice}`)
			.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: `?${queryString}`
		});
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = this.props.ings ? (
			<OrderSummary
				ingredients={this.props.ings}
				price={this.props.price}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
			/>
		) : null;
		if (this.state.isLoading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{this.props.ings ? (
					<React.Fragment>
						<Burger ingredients={this.props.ings} />
						<BuildControls
							ingredientAdded={this.props.onIngredientAdded}
							ingredientRemoved={this.props.onIngredientRemoved}
							disabled={disabledInfo}
							purchasable={this.state.purchasable}
							ordered={this.purchaseHandler}
							price={this.props.price}
						/>
					</React.Fragment>
				) : (
					<Spinner />
				)}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.price
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName =>
			dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: ingName =>
			dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
