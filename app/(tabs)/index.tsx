import AppText from "@/components/AppText";
import Loader from "@/components/Loader.native";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { FlatList, Image, ScrollView, View } from "react-native";
export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(() =>
    getTrendingMovies()
  );
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() =>
    fetchMovies({ query: '' })
  );

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <ScrollView
        className="flex-1 mt-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >

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
            onPress={() => router.push("/search")}
            placeholder="Search movies ..."
          />
        </View>

        {moviesLoading || trendingLoading ? (
          <>
            <Loader />
          </>
        ) : moviesError || trendingError ? (
          <>
              <View>
                  {/* Replace require with your local .json file path */}
                  <LottieView
                  source={require('../../assets/loader/warningAnimation.json')}
                  autoPlay
                  loop
                  style={{ width: 164, height: 164 }}
                  />
              </View>
              <AppText className="text-3xl text-orange-500 px-2">Error: {moviesError?.message || trendingError?.message}</AppText>
          </>
        ) : (
          <View className="mt-10">
            <>
              {trendingMovies && trendingMovies.length > 0 && (
                <>
                  <AppText className="text-lg text-white mb-2 ms-2">
                    Trending Movies
                  </AppText>

                  <FlatList
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingCard
                        movie={item}
                        index={index}
                      />
                    )}

                    keyExtractor={(item) => item.movie_id.toString()}

                    horizontal

                    ItemSeparatorComponent={() => <View className="w-2" />}

                    showsHorizontalScrollIndicator={false}

                    className="mt-2"
                  />
                </>
              )}
              <AppText className="text-lg text-white mb-2 ms-2">
                Latest Movies
              </AppText>


              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard
                    {...item}
                  />
                )}

                keyExtractor={(item) => item.id.toString()}

                numColumns={3}

                className="mt-2 pb-32"

                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
