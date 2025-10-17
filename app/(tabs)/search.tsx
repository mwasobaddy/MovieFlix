import AppText from "@/components/AppText";
import Loader from "@/components/Loader.native";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Replace with actual search term logic

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset
    } = useFetch(() =>
        fetchMovies({ query: searchQuery }),
        false
    );

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500); // Debounce for 500ms

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies]);

    return (
        <View className="flex-1 bg-primary">
            <View className="mt-10">
                <View className="mx-auto flex-row items-center justify-center">
                    <Image
                        source={require("../../assets/images/iconPage.png")}
                        className="w-20 h-20"
                    />
                    <AppText className="text-5xl text-white">
                        MovieFlix
                    </AppText>
                </View>

                <View
                    className="mt-5"
                >
                    <SearchBar
                        placeholder="Search movies ..."
                        value={searchQuery}
                        onChangeText={(text: string) => setSearchQuery(text)}
                    />
                </View>
            </View>

            {moviesLoading && (
                <View className="flex-1 items-center justify-center">
                    <Loader />
                </View>
            )}
            {moviesError && (
                <View className="flex-1 items-center justify-center">
                    <View>
                        {/* Replace require with your local .json file path */}
                        <LottieView
                        source={require('../../assets/loader/warningAnimation.json')}
                        autoPlay
                        loop
                        style={{ width: 164, height: 164 }}
                        />
                    </View>
                    <AppText className="text-3xl text-orange-500 px-2">Error: {moviesError?.message}</AppText>
                </View>
            )}
            {!moviesLoading && !moviesError && searchQuery.trim() && (
                <View className="px-2">
                    <AppText className="text-xl text-white mt-5">
                        Showing results for {' '}
                        <AppText className="text-xl text-pink-500 font-bold">'{searchQuery}'</AppText>
                    </AppText>
                    <AppText className="text-md text-light-300 mb-5">
                        {movies?.length ?? 0} results found
                    </AppText>

                    <FlatList
                        data={Array.isArray(movies) ? movies : []}
                        renderItem={({ item }) => (
                            <MovieCard
                                {...item}
                            />
                        )}

                        keyExtractor={(item) => item.id.toString()}

                        numColumns={3}

                        className="mt-2 pb-32"

                        ListEmptyComponent={
                            <View className="flex-1 items-center justify-center mt-10">
                                <AppText className="text-lg text-white">
                                    {searchQuery.trim() ? `No results found for '${searchQuery}'` : 'Start typing to search for movies'}
                                </AppText>
                            </View>
                        }
                    />
                </View>
            )}
        </View>
    );
}

export default Search;
