import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MovieResponse {
	id: number;
	title: string;
	poster_path: string;
	overview: string;
	release_date: string;
	vote_average: number;
	vote_count: number;
}

export default function Movies() {
	const [movies, setMovies] = useState<MovieResponse[]>([]);
	const API = '053a19c9b5914bc00db314d693753bb2';

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=en-US&page=1`)
			// fetch latest instead of popular
			// fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${API}&language=en-US&page=1`)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
				console.log(data.results);
			});
	}, []);

	return (
		// netflix black background
		<motion.section
			// animate
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="
      bg-black text-white min-h-min pt-16
    "
		>
			<h1 className="text-lg font-bold text-white pl-12 pr-12 pt-12 pb-3 sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">
				Popular movies
			</h1>
			<p className="text-gray-400 pl-12 pr-12 pb-3">
				Here are the most popular movies on the site. Click on a movie to see more details.
			</p>
			{/* grid layout nice */}
			<div className="grid gap-4 p-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6">
				{
					// map and then create a new component for each movie
					movies.map((movie) => {
						return <MovieCardComponent key={movie.id} movie={movie} />;
					})
				}
			</div>
		</motion.section>
	);
}

const MovieCardComponent = ({ movie }: { movie: MovieResponse }) => {
	return (
		// dynamically create a link to the movie page
		<Link to={`/movies/${movie.id}`} key={movie.id}>
			<div className="rounded-sm shadow-md">
				<motion.img
					whileHover={{ scale: 1.1 }}
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					className="object-cover rounded-lg shadow-md sm:h-full md:h-full lg:h-80 xl:h-80"
				/>
			</div>
		</Link>
	);
};
