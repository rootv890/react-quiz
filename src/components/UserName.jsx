/* eslint-disable react/prop-types */
const UserName = ({ username, dispatch }) => {
	return (
		<input
			value={username}
			onChange={(e) => {
				dispatch({
					type: 'setUsername',
					payload: e.target.value,
				});
			}}
			placeholder="Enter your Name"
			className="bg-gray-950 p-6 rounded-2xl mt-4 text-2xl"
		/>
	);
};

export default UserName;
