/* eslint-disable react/prop-types */
function FinishedScreen({
	username,
	points,
	maxPossiblePoints,
	highscore,
	dispatch,
}) {
	// 2 decimal places percentage
	const percentage = Math.round((points / maxPossiblePoints) * 10000) / 100;

	let emoji;

	if (percentage === 100) emoji = '🥇';
	if (percentage < 100 && percentage >= 80) emoji = '🥈';
	if (percentage < 80 && percentage >= 60) emoji = '🥉';
	if (percentage <= 60) emoji = '🤔';
	return (
		<div className="">
			<p className="result">
				{emoji} Your Scored <strong>{points}</strong> out of {maxPossiblePoints}{' '}
				({percentage}%)
			</p>

			<p className="highscore">
				{username}&apos;s Highest Points: {highscore}
			</p>

			<button
				onClick={() =>
					dispatch({
						type: 'restart',
					})
				}
				className="btn"
			>
				Restart
			</button>
		</div>
	);
}

export default FinishedScreen;
