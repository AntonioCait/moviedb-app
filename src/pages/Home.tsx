import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useViewportScroll } from 'framer-motion';

interface TVShowsResponse {
	id: number;
	name: string;
	poster_path: string;
}

interface MovieResponse {
	id: number;
	title: string;
	poster_path: string;
}

interface UnsplashRandomImageResponse {
	urls: {
		regular: string;
	};
}

export default function Home() {
	const API = '053a19c9b5914bc00db314d693753bb2';
	const UNSPLASH_API = 'Eu-IR2jWQ3V6JRrbk-8TN3olZjQtVjTRrAQorPiqj_k';
	const [tvShows, setTVShows] = useState<TVShowsResponse[]>([]);
	const [movies, setMovies] = useState<MovieResponse[]>([]);
	const [randomImage, setRandomImage] = useState<UnsplashRandomImageResponse>();
	const { scrollYProgress } = useViewportScroll();

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API}&language=en-US&page=1`)
			.then((res) => res.json())
			.then((data) => {
				setTVShows(data.results);
			});
	}, []);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=en-US&page=2`)
			// fetch latest instead of popular
			// fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${API}&language=en-US&page=1`)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
				console.log(data.results);
			});
	}, []);

	useEffect(() => {
		fetch(
			`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API}&query=movies&orientation=landscape&`
		)
			.then((res) => res.json())
			.then((data) => {
				setRandomImage(data);
			});
	}, []);

	return (
		<>
			<section className="bg-black">
				<motion.img
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					src={randomImage?.urls.regular}
					alt="random"
					className="w-full h-96 object-cover brightness-50"
				/>
			</section>
			<section className="bg-black flex flex-col items-center justify-center min-h-min">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="container mx-auto relative h-full"
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
						className="w-full h-full bg-black"
					>
						<h1 className="text-4xl font-bold text-white pl-12 pr-12 pt-12 pb-3">MovieDev</h1>
						<p className="text-lg text-white pl-12 pr-12 pb-3">
							Welcome to MovieDev, a website for developers who love movies and TV shows! Here, you can find
							all the latest and greatest films and television series, as well as reviews and insights from
							fellow developers. Whether you're a fan of blockbuster hits or indie darlings, we've got
							something for everyone. Our mission is to provide a space where developers can come together to
							discuss and discover the best in film and television. So sit back, relax, and let us help you
							find your next cinematic or television masterpiece.
						</p>
					</motion.div>
				</motion.div>
			</section>

			<section className=" bg-black min-h-min">
				<motion.div>
					<h2 className="text-lg font-bold text-white pl-12 pr-12 pt-12 pb-3 sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">
						Popular TV Shows
					</h2>
					<div className="grid gap-4 p-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6">
						{/* Link */}
						{tvShows.slice(0, 6).map((tvShow) => (
							<Link to={`/tv/${tvShow.id}`} key={tvShow.id}>
								<motion.img
									whileHover={{ scale: 1.1 }}
									src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
									alt={tvShow.name}
									className="object-cover rounded-lg shadow-md sm:h-full md:h-full lg:h-80 xl:h-80"
								/>
							</Link>
						))}
					</div>
				</motion.div>
			</section>
			<section className=" bg-black	min-h-min">
				<div>
					<h2 className="text-lg font-bold text-white pl-12 pr-12 pt-12 pb-3 sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">
						Trending
					</h2>
					<div className="grid gap-4 p-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6">
						{/* Link */}
						{movies.slice(0, 6).map((movie) => (
							<Link to={`/movies/${movie.id}`} key={movie.id}>
								<motion.img
									whileHover={{ scale: 1.1 }}
									src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
									alt={movie.title}
									className="object-cover rounded-lg shadow-md sm:h-full md:h-full lg:h-80 xl:h-80"
								/>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
