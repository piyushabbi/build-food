import * as actionTypes from './actions';

export const addIngredient = name => ({
	type: actionTypes.ADD_INGREDIENT,
	ingredientName: name
});

export const removeIngredient = name => ({
	type: actionTypes.REMOVE_INGREDIENT,
	ingredientName: name
});
