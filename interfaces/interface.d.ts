export interface Movie {
  id: number;
  title?: string;
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}



export interface TrendingMovie {
    id: number;
    title: string;
    poster_url: string;
    count: number;
}

export type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path?: string;
    genres?: { id: number; name: string }[];
    runtime?: number;
    vote_average?: number;
    [key: string]: any; // Add more fields as needed
};
