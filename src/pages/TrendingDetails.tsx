import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Upcoming } from '../components/Upcoming';

interface TrendingResponse {
	id: number;
	name: string;
	poster_path: string;
	overview: string;
	backdrop_path: string;
}

export const TrendingDetails = () => {
	const { id } = useParams<string>();
	const [trending, setTrending] = useState<TrendingResponse>();
	const API = '053a19c9b5914bc00db314d693753bb2';

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API}`)
			.then((res) => res.json())
			.then((data) => {
				setTrending(data);
				console.log(data);
			});
	}, [id]);

	if (!trending) {
		return <div>Loading...</div>;
	}

	return (
		// two column layout grid
		<>
			<section
				className="bg-black
      text-white grid grid-cols-2 gap-4 p-12  h-screen  overflow-y-scroll
    "
			>
				{/* Render the movie details here */}
				{/* movie cover*/}
				<div
					className="
      flex flex-col justify-center items-center md:items-start  md:justify-start
      "
				>
					<img
						src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`}
						alt={trending.name}
						className="object-cover h-96 w-64 md:w-96 md:h-full rounded-lg"
					/>
				</div>
				{/* movie details */}
				<div
					className="
      flex flex-col justify-center items-center md:items-start  md:justify-start
      "
				>
					<h1 className="text-4xl font-bold">{trending.name}</h1>
					<p className="text-xl font-semibold">Overview</p>
					<p className="text-lg">{trending.overview}</p>
				</div>
			</section>
			<Upcoming />
		</>
	);
};
