/* eslint-disable react/prop-types */
const Welcome = ({ numQuestions, dispatch }) => {
	return (
		<div className="flex flex-col justify-center items-center font-mono text-center  text-balance ">
			<h2 className="text-7xlfont-semibold  ">
				Welcome to the Vite Quiz Challenge!
			</h2>
			<p className="text-3xl">
				We will ask you {numQuestions || 0} questions. <br />
				You can only choose one answer. <br />
				Are you ready?
			</p>
			<button
				onClick={() => dispatch({ type: 'start' })}
				className=" bg-emerald-500 hover:bg-emerald-700 transition-all  text-white font-bold py-4 text-2xl  px-6 rounded-full mt-4
            "
			>
				Let&apos;s Vite
			</button>
		</div>
	);
};

export default Welcome;
