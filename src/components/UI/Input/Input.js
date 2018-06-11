import React from 'react';
import classes from './Input.css';

const Input = props => {
	let inputEl = null;

	switch (props.inputtype) {
		case 'input': {
			inputEl = (
				<input
					className={classes.InputEl}
					onChange={props.changehandler}
					{...props}
				/>
			);
			break;
		}
		case 'textarea': {
			inputEl = (
				<textarea
					className={classes.InputEl}
					onChange={props.changehandler}
					{...props}
				/>
			);
			break;
		}
		case 'select': {
			inputEl = (
				<select
					className={classes.Select}
					onChange={props.changehandler}
					{...props}
				>
					{props.options.map(op => (
						<option key={op} value={op}>
							{op}
						</option>
					))}
				</select>
			);
			break;
		}
		default: {
			inputEl = (
				<input
					className={classes.InputEl}
					onChange={props.changehandler}
					{...props}
				/>
			);
		}
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputEl}
		</div>
	);
};

export default Input;
