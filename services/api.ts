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

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2JjMzMwZDA1NzAxMWFjN2FjMWQ5ZDNmNzBkM2VkZSIsIm5iZiI6MTc2MDYzMTQzMi44MzMsInN1YiI6IjY4ZjExYTg4NjQ2MDNiMWQxNGUyYmJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v5er1yF6WlXxBz01VHEK9N4keOYGwxQ0ROBpsGn9aCg'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));