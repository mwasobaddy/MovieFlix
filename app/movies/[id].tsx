import AppText from '@/components/AppText'
import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { format } from 'date-fns'
import { router, useLocalSearchParams } from 'expo-router'
import { MoveLeft } from 'lucide-react-native'
import React from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

const MovieDetails = () => {

    const {id} = useLocalSearchParams();

    const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));

  return (
    // <>
        <View className='bg-primary flex-1'>
            <ScrollView contentContainerStyle={{paddingBottom: 80}}>
                <View>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
                        className='w-full h-[550px]'
                        resizeMode='stretch'
                    />
                </View>
                <View className='px-4 mt-4'>
                    <AppText className='text-white text-3xl font-bold mb-2'>
                        { movie?.title }
                    </AppText>
                    <View className='flex-row items-center gap-4 mb-4'>
                        <AppText className='text-light-300 text-sm'>
                            { movie?.release_date?.split('-')[0] }
                        </AppText>
                        <AppText className='text-light-300 text-sm mx-2'>|</AppText>
                        <AppText className='text-light-300 text-sm'>
                            { movie?.adult ? '18+' : 'PG-13' }
                        </AppText>
                        <AppText className='text-light-300 text-sm mx-2'>|</AppText>
                        <AppText className='text-light-300 text-sm'>
                            {/* @ts-ignore */}
                            { Math.floor(movie?.runtime / 60) }h { movie?.runtime % 60 }m
                        </AppText>
                    </View>
                    <View className='mb-4 flex-row items-center gap-2 bg-gray-800 px-3 py-1 rounded-full' style={{ width: 168 }}>
                        <AppText className='text-yellow-500 text-base'>⭐</AppText>
                        <AppText className='text-yellow-500 text-base'>
                            { movie?.vote_average?.toFixed(1) } / 10
                        </AppText>
                        {/* votes */}
                        <AppText className='text-light-200 text-sm'>
                            ({movie?.vote_count} votes)
                        </AppText>
                    </View>
                    <View className='mb-4'>
                        <AppText className='text-white text-2xl font-bold mb-2'>
                            Overview
                        </AppText>
                        <AppText className='text-light-300 text-base' style={{ lineHeight: 20 }}>
                            { movie?.overview }
                        </AppText>
                    </View>
                    <View className='mb-4 flex-row gap-10'>
                        <View>
                            {/* release date */}
                            <AppText className='text-white text-2xl font-bold mb-2'>
                                Release&nbsp;Date
                            </AppText>
                            <AppText className='text-light-300 text-base' style={{ lineHeight: 20 }}>
                                Release Date: {
                                    movie?.release_date && format(new Date(movie.release_date), 'MMMM d, yyyy')
                                }
                            </AppText>
                        </View>
                        <View>
                            {/* status */}
                            <AppText className='text-white text-2xl font-bold mb-2'>
                                Status
                            </AppText>
                            <AppText className='text-light-300 text-base' style={{ lineHeight: 20 }}>
                                { movie?.status }
                            </AppText>
                        </View>
                    </View>
                    <View className='mb-4'>
                        {/* genres */}
                        <AppText className='text-white text-2xl font-bold mb-2'>
                            Genres
                        </AppText>
                        <View className='flex-row flex-wrap gap-2'>
                            {/* @ts-ignore */}
                            { movie?.genres.map((genre) => (
                                <View
                                    key={genre.id}
                                    className='bg-gray-800 px-3 py-1 rounded-full'
                                >
                                    <AppText className='text-light-300 text-base'>
                                        { genre.name }
                                    </AppText>
                                </View>
                            )) || <AppText className='text-light-300 text-base'>No genres available</AppText>}
                        </View>
                    </View>
                    <View className='mb-4'>
                        <AppText className='text-white text-2xl font-bold mb-2'>
                            Regions
                        </AppText>
                        <AppText>
                            <View className='flex-row flex-wrap gap-2'>
                                {/* @ts-ignore */}
                                { movie?.watching_regions?.map((region) => (
                                    <View
                                        key={region.id}
                                        className='bg-gray-800 px-3 py-1 rounded-full'
                                    >
                                        <AppText className='text-light-300 text-base'>
                                            { region.name }
                                        </AppText>
                                    </View>
                                )) }
                            </View>
                        </AppText>
                    </View>
                    <View className='mb-4 flex-row gap-10'>
                        <View>
                            <AppText className='text-white text-2xl font-bold mb-2'>
                                Budget
                            </AppText>
                            <AppText className='text-light-300 text-base' style={{ lineHeight: 20 }}>
                                ${ movie?.budget / 1000000 } million
                            </AppText>
                        </View>
                        <View>
                            <AppText className='text-white text-2xl font-bold mb-2'>
                                Revenue
                            </AppText>
                            <AppText className='text-light-300 text-base' style={{ lineHeight: 20 }}>
                                ${ Math.round(movie?.revenue / 1000000) } million
                            </AppText>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent py-3.5 rounded-lg flex-row items-center justify-center z-50 gap-3' onPress={router.back}>
                <MoveLeft size={20} color='#fff' className='mr-2' />
                <AppText className='text-white font-semibold text-lg'>Back</AppText>
            </TouchableOpacity>
        </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})