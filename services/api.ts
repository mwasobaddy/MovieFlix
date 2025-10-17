import { MovieDetails } from '../interfaces/interface';

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
    ORIGINAL_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/original',
    YOUTUBE_BASE_URL: 'https://www.youtube.com/watch?v=',
}

export const fetchMovies = async ({query}: {query: string}) => {
    try {
        const endpoint = query
            ? `/search/movie?query=${encodeURIComponent(query)}&include_adult=true`
            : '/discover/movie?sort_by=popularity.desc&include_adult=true'; 

        const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch movies', response.statusText);
        }

        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}π`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch movie details', response.statusText);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}