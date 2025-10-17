import { Movie, TrendingMovie } from "@/interfaces/interface";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!; // collection to store search counts

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments({
            databaseId: DATABASE_ID,
            collectionId: COLLECTION_ID,
            queries: [
                Query.equal("searchTerm", query)
            ]
        })
        
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument({
                databaseId: DATABASE_ID,
                collectionId: COLLECTION_ID,
                documentId: existingMovie.$id,
                data: {
                    count: existingMovie.count + 1,
                    title: movie.title
                }
            });
        } else {
            await database.createDocument({
                databaseId: DATABASE_ID,
                collectionId: COLLECTION_ID,
                documentId: ID.unique(),
                data: {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    title: movie.title
                }
            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments({
            databaseId: DATABASE_ID,
            collectionId: COLLECTION_ID,
            queries: [
                Query.orderDesc("count"),
                Query.limit(10)
            ]
        });

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return undefined;
    }
}