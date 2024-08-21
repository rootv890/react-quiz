/* eslint-disable react/prop-types */
function NextButton({ answer, index, numQuestions, dispatch }) {
	if (answer === null) {
		return null;
	}
	if (index < numQuestions - 1) {
		return (
			<button
				className={styles.button}
				onClick={() => dispatch({ type: 'nextQuestion' })}
			>
				Next
			</button>
		);
	}
	if (index === numQuestions - 1) {
		return (
			<button
				className={styles.button}
				onClick={() => dispatch({ type: 'finish' })}
			>
				Finish
			</button>
		);
	}
}

export default NextButton;

const styles = {
	button:
		'bg-gray-500 p-6   rounded-3xl max-w-[36rem] text-left pl-12  flex-shrink-0 hover:bg-emerald-400 transition-all text-2xl duration-500 ease-in-out  ',
};
