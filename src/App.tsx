import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import { MovieDetails } from './pages/MovieDetails';
import { Footer } from './components/Footer';
import { TVShowsDetails } from './pages/TVShowsDetails';
// import { TrendingDetails } from './pages/TrendingDetails';
import { motion, AnimatePresence } from 'framer-motion';

// API KEY

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<AnimatePresence>
				<Routes>
					<Route
						path="/"
						element={
							<motion.div
								initial={{ x: 300, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -300, opacity: 0 }}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
							>
								<Home />
							</motion.div>
						}
					/>
					<Route
						path="/movies"
						element={
							<motion.div
								initial={{ x: 300, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -300, opacity: 0 }}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
							>
								<Movies />
							</motion.div>
						}
					/>
					<Route
						path="/movies/:id"
						element={
							<motion.div
								initial={{ x: 300, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -300, opacity: 0 }}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
							>
								<MovieDetails />
							</motion.div>
						}
					/>
					<Route
						path="/tv/:id"
						element={
							<motion.div
								initial={{ x: 300, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -300, opacity: 0 }}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
							>
								<TVShowsDetails />
							</motion.div>
						}
					/>
				</Routes>
			</AnimatePresence>

			{/* <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/movies/:id" element={<MovieDetails />} />
				<Route path="/tv/:id" element={<TVShowsDetails />} />
			</Routes> */}
			<Footer />
		</BrowserRouter>
	);
}

export default App;
