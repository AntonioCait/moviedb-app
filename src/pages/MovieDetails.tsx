import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Upcoming } from '../components/Upcoming';
import { motion } from 'framer-motion';

interface MovieResponse {
	id: number;
	title: string;
	poster_path: string;
	overview: string;
	release_date: string;
	vote_average: number;
	vote_count: number;
	// providers
	production_companies: [
		{
			id: number;
			logo_path: string;
			name: string;
			origin_country: string;
		}
	];
}

export const MovieDetails = () => {
	const { id } = useParams<string>();
	const [movie, setMovie] = useState<MovieResponse>();
	const API = '053a19c9b5914bc00db314d693753bb2';

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}&language=en-US`)
			.then((res) => res.json())
			.then((data) => {
				setMovie(data);
			});
	}, [id]);

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		// two column layout grid
		<>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="bg-black 
      text-white grid gap-4 p-12 min-h-min pt-24 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2
    "
			>
				{/* Render the movie details here */}
				{/* movie cover*/}
				<div
					className="
      flex flex-col justify-center items-center md:items-start  md:justify-start  
      "
				>
					<motion.img
						src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
						alt={movie.title}
						className="object-cover h-96 w-64 md:w-96 md:h-full rounded-lg"
					/>
				</div>
				{/* movie details */}
				<div
					className="
      flex flex-col justify-center items-center md:items-start  md:justify-start 
      "
				>
					<h1 className="text-2xl font-bold text-white mb-4">{movie.title}</h1>
					<p className="text-sm text-gray-400 font-semibold mb-8">{movie.overview}</p>
					<p className="text-sm text-gray-400">
						Released on:{' '}
						{
							// convert date to string
							new Date(movie.release_date).toDateString()
						}
					</p>
					<p className="text-sm text-gray-400">Average rating: {Math.ceil(movie.vote_average)}</p>
					<p className="text-sm text-gray-400">Total votes: {movie.vote_count}</p>

					{/* prod comp */}
					<div className="flex flex-col justify-center items-center md:items-start  md:justify-start mt-12 ">
						<h1 className="text-md font-bold text-white mb-4">Production Companies</h1>
						<div className="flex flex-col justify-center items-center md:items-start  md:justify-start ">
							{movie.production_companies.map((company) => (
								<div className="flex flex-col justify-center items-center md:items-start  md:justify-start ">
									<p className="text-sm text-gray-400 font-light mt-2">{company.name}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</motion.section>
			{/* Upcoming movies */}
			<section>
				<Upcoming />
			</section>
		</>
	);
};
