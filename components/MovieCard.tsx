import { Link } from 'expo-router'
import { Star } from 'lucide-react-native'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Movie } from '../interfaces/interfaces'
import AppText from './AppText'

const MovieCard: React.FC<Movie> = ({ id, title, poster_path, vote_average, release_date, type, overview }) => {
  return (
    // @ts-ignore
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[29%]' style={{ margin: 10 }}>
            {poster_path ? (
                <>
                    <Image
                        source={{
                            uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : 'https://via.placeholder.com/600x400/1a1a1a/FFFFFF.png'
                        }}
                        className='w-full h-52 rounded-lg mb-4'
                        resizeMode='cover'
                    />
                    <AppText
                        className='text-white'
                        numberOfLines={1}
                    >
                        { title }
                    </AppText>
                    {/* import lucide star icon for the movie rating */}
                    <View className='flex-row items-center mt-1 gap-4'>
                        <View className='flex-row items-center'>
                            {Array.from({ length: 5 }, (_, index) => (
                                <Star
                                    key={index}
                                    size={12}
                                    color={index < Math.round((vote_average ?? 0) / 2) ? '#FFD700' : '#CCCCCC'}
                                    style={{ marginRight: 2 }}
                                />
                            ))}
                        </View>
                        <AppText className='text-xs text-light-300 font-medium' style={{ color: '#FFD700', marginRight: 5 }}>{ Math.round((vote_average ?? 0) / 2).toFixed(1) }</AppText>
                    </View>

                    <AppText
                        className='text-sm text-pink-500'
                        style={{ marginTop: 5, fontWeight: '100' }}
                        numberOfLines={3}
                    >
                        {overview}
                    </AppText>

                    <View className='flex-row items-center justify-between mt-1'>
                        <AppText className='text-xs text-light-300 font-medium' style={{ color: '#A8B5DB' }}>{release_date?.split('-')[0]}</AppText>
                        <AppText className='text-xs text-light-300 font-medium' style={{ color: '#A8B5DB', marginLeft: 5 }}>{'(' + (type === 'Series' ? 'Series' : 'Movie') + ')'}</AppText>
                    </View>
                </>
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AppText>No Image</AppText>
              </View>
            )}
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard