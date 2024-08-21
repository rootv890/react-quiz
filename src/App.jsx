import Error from './components/Error';
import Header from './components/Header';
import Loader from './components/Loader';
import Quiz from './Quiz';

import { useReducer } from 'react';
import { useEffect } from 'react';
import Welcome from './components/Welcome';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishedScreen from './components/FinishedScreen';
import Timer from './components/Timer';
import Footer from './components/Footer';

const initialState = {
	questions: [],
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
	username:
		/* Fetch from LocalStorage "username" key */ localStorage.getItem(
			'username',
		) || '',
};
var SECS_PER_QUESTION = 1;
const reducerFn = (state, action) => {
	switch (action.type) {
		case 'setUsername':
			return {
				...state,
				username:
					(localStorage.setItem('username', action.payload), action.payload),
			};
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };

		case 'dataFailed':
			return { ...state, questions: [''], status: 'error' };

		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};

		case 'newAnswer': {
			const question = state.questions[state.index];
			return {
				...state,
				answer: action.payload,
				points:
					// payload is the index of the option
					action.payload === question.correctOption
						? state.points + question.points
						: state.points - Math.floor(question.points / 2),
			};
		}
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};

		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
				username: state.username,
			};
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : 'active',
			};
		default:
			throw new Error(`Unrecognized action: ${action.type}`);
	}
};

const App = () => {
	// UseReducer for State Management
	const [state, dispatch] = useReducer(reducerFn, initialState);

	// Destructure
	const {
		questions,
		status,
		index,
		answer,
		points,

		highscore,
		secondsRemaining,
		username,
	} = state;

	const numQuestions = questions.length;

	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0,
	);

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
			<Header username={username} />

			<Quiz>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<Welcome
						numQuestions={numQuestions}
						dispatch={dispatch}
						username={username}
					/>
				)}
				{status === 'active' && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
							points={points}
						/>
						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<NextButton
								answer={answer}
								dispatch={dispatch}
								index={index}
								numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}

				{status === 'finished' && (
					<FinishedScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						username={username}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Quiz>
		</div>
	);
};

export default App;
