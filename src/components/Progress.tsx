import React from 'react';

const Progress = ({
	index,
	numQuestions,
	points,
	maxPossiblePoints,
	answer,
}) => {
	return (
		<header className={styles.progress}>
			<progress
				value={index + Number(answer !== null)}
				max={numQuestions}
			></progress>
			<div className="w-full flex justify-between text-2xl">
				<p className={styles.questionNumber}>
					Question {index + 1} / {numQuestions}
				</p>
				<p className={styles.points}>
					{points} / {maxPossiblePoints}
				</p>
			</div>
		</header>
	);
};

export default Progress;

const styles = {
	progress:
		'w-full flex flex-col justify-center items-center gap-6 text-center font-mono text-balance',
	questionNumber: ' text-balance text-left',
	points: ' text-balance text-left',
};
