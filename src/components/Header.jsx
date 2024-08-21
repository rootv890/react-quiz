/* eslint-disable react/prop-types */

function Header({ username }) {
	return (
		<header className="flex w-full max-h-24  justify-between items-center">
			<h1 className="font-mono text-5xl  bg-white rounded-md text-black p-2 ">
				The Vite Quiz
			</h1>
			<p className="font-mono text-2xl  bg-white rounded-md text-black p-2 ">
				Welcome, {username}
			</p>
		</header>
	);
}

export default Header;
