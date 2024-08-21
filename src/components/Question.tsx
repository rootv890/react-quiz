import React from 'react';
import Options from './Options';

function Question({ question, dispatch, answer, points }) {
	return (
		<div className="w-full flex flex-col justify-center items-center gap-6 text-center  font-mono text-balance">
			<h1 className="text-3xl">{question.question}</h1>
			{/* options */}
			<div className="w-full px-12 flex flex-col gap-4">
				<Options
					options={question.options}
					dispatch={dispatch}
					answer={answer}
					correctOption={question.correctOption}
					points={points}
				/>
			</div>
			<p className="text-4xl">Points : {points}</p>
		</div>
	);
}

export default Question;
