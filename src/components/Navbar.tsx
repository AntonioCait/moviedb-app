import React from 'react';
import { Link } from 'react-router-dom';
// GoThreeBars
import { GoThreeBars } from 'react-icons/go';
// CgMonday
import { CgMonday } from 'react-icons/cg';
import { motion } from 'framer-motion';

function Navbar() {
	const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

	return (
		<nav className="flex items-center justify-between px-4 py-3 bg-zinc-900 fixed min-w-full z-10 h-16">
			<div className="flex items-center">
				{/* <img src="/logo.svg" alt="Logo" className="w-10 h-10" /> */}
				{/* <CgMonday className="w-10 h-10 text-white" /> */}
				<Link to="/" className="text-white text-2xl font-bold">
					<CgMonday className="w-10 h-10 text-white" />
				</Link>
			</div>
			<div className="flex items-center md:hidden">
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="px-3 py-2 rounded-full text-white hover:bg-gray-900 "
				>
					<GoThreeBars className="h-10" />
				</button>
				<motion.div
					// appear from the right side of the screen and slide in from the right with transition smoothness but also when the menu is closed,
					// it will slide out to the right with transition smoothness
					initial={{ x: 300 }}
					animate={{ x: menuOpen ? 0 : 300 }}
					transition={{ type: 'spring', stiffness: 120, damping: 20 }}
					// animate={{
					// 	x: menuOpen ? 0 : 300,
					// }}
					// transition={{
					// 	type: 'spring',
					// 	stiffness: 120,
					// 	damping: 20,
					// }}
					className={`${
						menuOpen ? 'block' : 'hidden'
					} md:hidden absolute right-0 py-2 bg-zinc-900 w-2/3 text-center min-h-screen top-16 ease-out duration-300`}
				>
					<Link
						to="/"
						className="block px-3 py-2 rounded-full text-white hover:bg-gray-900"
						onClick={() => setMenuOpen(false)}
					>
						Home
					</Link>
					<Link
						to="/movies"
						className="block px-3 py-2 rounded-full text-white hover:bg-gray-900"
						onClick={() => setMenuOpen(false)}
					>
						Movies
					</Link>
				</motion.div>
			</div>
			<div className="hidden md:flex">
				<Link
					to="/"
					className="px-4 py-1 rounded-lg ml-4 text-black hover:bg-gray-700 hover:text-white bg-stone-100 ease-linear duration-300"
				>
					Home
				</Link>
				<Link
					to="/movies"
					className="px-4 py-1 rounded-lg ml-4 text-black hover:bg-gray-700 hover:text-white bg-stone-100	 ease-linear duration-300"
				>
					Movies
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
