import { useReducer } from 'react';

const intitialState = {
	count: 0,
	step: 1,
};

const reducerFn = (state, action) => {
	switch (action.type) {
		case 'dec':
			return { ...state, count: state.count - state.step };
		case 'inc':
			return { ...state, count: state.count + state.step };
		case 'setCount':
			return { ...state, count: action.payload };

		case 'setStep':
			return { ...state, step: action.payload };
		case 'reset':
			return intitialState;
		default:
			throw new Error('Invalid action type');
	}
};
// All logics are stored in one central place, the reducer function. The component only dispatches actions to the reducer function.

function DateCounter() {
	// const intitialState = {
	// 	count: 0,
	// 	step: 1,
	// };

	const [state, dispatch] = useReducer(reducerFn, intitialState);

	const { count, step } = state;

	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	const dec = function () {
		dispatch({ type: 'dec', payload: step });
	};

	const inc = function () {
		dispatch({ type: 'inc', payload: step });
	};

	const defineCount = function (e) {
		dispatch({ type: 'setCount', payload: Number(e.target.value) });
	};

	const defineStep = function (e) {
		dispatch({ type: 'setStep', payload: Number(e.target.value) });
	};

	const reset = function () {
		dispatch({ type: 'reset' });
	};

	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}

export default DateCounter;
