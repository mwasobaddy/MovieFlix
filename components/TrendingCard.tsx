import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import gradient from '../assets/images/gradientNumber.png';
import AppText from './AppText';


const TrendingCard = ({ movie: { movie_id, poster_url, title }, index }: TrendingCardProps) => {
    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className="mr-4 mb-8 w-32">
                <View className="h-48 w-32 rounded-lg bg-gray-800">
                    <Image
                        source={{ uri: poster_url }}
                        className="h-48 w-32 rounded-lg"
                        resizeMode='cover'
                    />
                </View>
                <AppText className="absolute bottom-9 -left-4 px-2 py-1 rounded-full">
                    <MaskedView
                        maskElement={
                            <AppText className='font-bold text-white text-6xl'>{index + 1}</AppText>
                        }
                    >
                        <Image
                            source={gradient}
                            className='size-14'
                            resizeMode='cover'
                        />
                    </MaskedView>
                </AppText>
                <AppText
                    className="mt-2 text-sm font-medium text-white"
                    numberOfLines={2}
                >
                    {title}
                </AppText>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingCard