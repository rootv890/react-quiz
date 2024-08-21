import { useEffect } from 'react';

function Timer({ secondsRemaining, dispatch }) {
	const mins = Math.floor(secondsRemaining / 60);
	const secs = secondsRemaining % 60;

	useEffect(() => {
		const intervalId = setInterval(() => {
			dispatch({ type: 'tick' });
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [dispatch]);

	return (
		<div className="timer">
			<p>
				{mins} min : {secs} sec
			</p>
		</div>
	);
}

export default Timer;
