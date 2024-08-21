import { useReducer } from 'react';
import { useState } from 'react';

const reducerFn = (state, action) => {
	// if (action.type === 'dec') {
	// 	return state - action.payload;
	// }
	// if (action.type === 'inc') {
	// 	return state + action.payload;
	// }
	// if (action.type === 'set') {
	// 	return action.payload;
	// }
	// console.log('State:', state);
	// console.log('Action:', action);

	// Switch are commonly used in reducers.
	switch (action.type) {
		case 'dec':
			return { ...state, count: state.count - state.step };
		case 'inc':
			return { ...state, count: state.count + state.step };
		case 'setCount':
			return { ...state, count: action.payload };

		case 'setStep':
			return { ...state, step: action.payload };
		default:
			throw new Error('Invalid action type');
	}
};
function DateCounter() {
	// const [count, setCount] = useState(0);
	// var initialCount = 0;
	// const [count, dispatch] = useReducer(reducerFn, initialCount);

	// const [step, setStep] = useState(1);

	const intitialState = {
		count: 0,
		step: 1,
	};

	const [state, dispatch] = useReducer(reducerFn, intitialState);

	const { count, step } = state;

	// This mutates the date object.
	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	const dec = function () {
		// setCount((count) => count - 1);
		// setCount((count) => count - step);
		dispatch({ type: 'dec', payload: step });
	};

	const inc = function () {
		// setCount((count) => count + 1);
		// setCount((count) => count + step);
		dispatch({ type: 'inc', payload: step });
	};

	const defineCount = function (e) {
		// setCount(Number(e.target.value));
		dispatch({ type: 'setCount', payload: Number(e.target.value) });
	};

	const defineStep = function (e) {
		// setStep(Number(e.target.value));
		dispatch({ type: 'setStep', payload: Number(e.target.value) });
	};

	const reset = function () {
		// setCount(0);
		// setStep(1);
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
