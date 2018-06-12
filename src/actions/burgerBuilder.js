import * as actionTypes from './actions';
import axios from '../axios.orders';

export const addIngredient = name => ({
	type: actionTypes.ADD_INGREDIENT,
	ingredientName: name
});

export const removeIngredient = name => ({
	type: actionTypes.REMOVE_INGREDIENT,
	ingredientName: name
});

export const setIngredients = ingredients => ({
	type: actionTypes.SET_INGREDIENTS,
	ingredients
});

// Async Action | Thunk
export const initIngredients = () => dispatch => {
	axios
		.get('/ingredients.json')
		.then(res => {
			dispatch(setIngredients(res.data));
		})
		.catch(err => console.log(err));
};
