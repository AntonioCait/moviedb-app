import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Upcoming } from '../components/Upcoming';

interface TVShowsResponse {
	id: number;
	name: string;
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

export const TVShowsDetails = () => {
	const { id } = useParams<string>();
	const [tvShows, setTVShows] = useState<TVShowsResponse>();
	const API = '053a19c9b5914bc00db314d693753bb2';

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API}&language=en-US`)
			.then((res) => res.json())
			.then((data) => {
				setTVShows(data);
			});
	}, [id]);

	if (!tvShows) {
		return <div>Loading...</div>;
	}

	return (
		// two column layout grid
		<>
			<section
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
					<img
						src={`https://image.tmdb.org/t/p/w500/${tvShows.poster_path}`}
						alt={tvShows.name}
						className="object-cover h-96 w-64 md:w-96 md:h-full rounded-lg"
					/>
				</div>
				{/* movie details */}
				<div
					className="
      flex flex-col justify-center items-center md:items-start  md:justify-start text-white
      "
				>
					<h1 className="mb-4 text-2xl font-bold text-white">{tvShows.name}</h1>
					<p className="text-sm text-gray-400 font-semibold">Overview</p>
					<p className="mb-4 text-sm text-gray-400">{tvShows.overview}</p>
					<p className="text-sm text-gray-400 font-semibold">Rating</p>
					<p className="mb-4 text-sm text-gray-400">{Math.round(tvShows.vote_average * 10) / 10}</p>
					<p className="text-sm text-gray-400 font-semibold">Vote Count</p>
					<p className="mb-4 text-sm text-gray-400">{tvShows.vote_count}</p>
					<p className="mb-4 text-sm text-gray-400 font-semibold">Production Companies</p>
					{tvShows.production_companies.map((company) => (
						<p className="text-sm text-gray-400" key={company.id}>
							{company.name}
						</p>
					))}
				</div>
			</section>
			<Upcoming />
		</>
	);
};
