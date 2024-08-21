import Error from './components/Error';
import Header from './components/Header';
import Loader from './components/Loader';
import Quiz from './Quiz';

import { useReducer } from 'react';
import { useEffect } from 'react';
import Welcome from './components/Welcome';
import Questions from './components/Questions';

const initialState = {
	questions: [],
	status: 'loading', // 'loading', 'error', 'ready'. 'active', 'finished'
};
const reducerFn = (state, action) => {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };

		case 'dataFailed':
			return { ...state, questions: ['lol'], status: 'error' };

		case 'start':
			return { ...state, status: 'active' };

		default:
			throw new Error(`Unrecognized action: ${action.type}`);
	}
};

const App = () => {
	// UseReducer for State Management
	const [state, dispatch] = useReducer(reducerFn, initialState);

	const { questions, status } = state;

	const numQuestions = questions.length;

	useEffect(() => {
		const getQuestions = async () => {
			try {
				const res = await fetch('http://localhost:8080/questions');
				if (!res.ok) {
					throw new Error('Got an error from the server');
				}
				const data = await res.json();
				dispatch({ type: 'dataReceived', payload: data });
			} catch (error) {
				dispatch({ type: 'dataFailed' });
				console.error(error.message);
			}
		};
		getQuestions();
	}, []);
	return (
		<div>
			<Header />
			<Quiz>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<Welcome numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && <Questions />}
			</Quiz>
		</div>
	);
};

export default App;
