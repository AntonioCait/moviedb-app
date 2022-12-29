import { useState, useEffect } from 'react';

interface MovieResponse {
	id: number;
	title: string;
	poster_path: string;
}

export const Upcoming = () => {
	const API = '053a19c9b5914bc00db314d693753bb2';
	const [movies, setMovies] = useState<MovieResponse[]>([]);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API}&language=en-US&page=1`)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
			});
	}, []);

	return (
		<section className="bg-black min-h-min">
			<div>
				<h2
					className="
					text-lg font-bold text-white pl-12 pr-12 pt-12 pb-3 sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl
        "
				>
					Upcoming movies
				</h2>
			</div>
			<div className=" grid gap-4 p-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6">
				{
					// get only 6 movies
					movies.slice(0, 6).map((movie) => (
						<div key={movie.id}>
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
								alt={movie.title}
								className="object-cover rounded-sm shadow-md sm:h-full md:h-full lg:h-80 xl:h-80"
							/>
						</div>
					))
				}
			</div>
		</section>
	);
};
