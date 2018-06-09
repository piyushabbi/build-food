import React from 'react';
import classes from './Order.css';

const Order = props => {
	const ingredients = [];
	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}
	const ingredientOutput = ingredients.map(ig => (
		<span
			key={ig.name}
			style={{
				textTransform: 'capitalize',
				margin: '0 8px',
				display: 'inline-block',
				border: '1px solid #ccc',
				padding: '5px'
			}}
		>
			{ig.name} ({ig.amount})
		</span>
	));

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <b>${Number(props.price).toFixed(2)}</b>
			</p>
		</div>
	);
};

export default Order;
