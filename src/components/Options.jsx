/* eslint-disable react/prop-types */

const Options = ({ options, dispatch, answer, correctOption }) => {
	const hasAnswered = answer !== null;
	return (
		<>
			{options.map((option, index) => (
				<div key={index}>
					<button
						disabled={hasAnswered}
						onClick={() => {
							dispatch({ type: 'newAnswer', payload: index });
						}}
						className={`${styles.button} ${
							hasAnswered
								? index === correctOption
									? styles.choosen
									: styles.wrong
								: ''
						}  `}
					>
						{index + 1}. {option}
					</button>
				</div>
			))}
		</>
	);
};

export default Options;

const styles = {
	button:
		'bg-gray-500 p-6  w-3/4 rounded-3xl max-w-[36rem] text-left pl-12  flex-shrink-0 hover:bg-emerald-400 transition-all text-2xl duration-500 ease-in-out hover:translate-x-4  disabled:cursor-not-allowed disabled:translate-x-0  ',
	choosen: 'bg-emerald-500 translate-x-4 ',
	wrong: 'bg-red-500 ',
};
