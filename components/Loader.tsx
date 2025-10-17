import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const Loader = () => {
  if (Platform.OS === 'web') {
    // Only import @lottiefiles/dotlottie-react on web
    const { DotLottieReact } = require('@lottiefiles/dotlottie-react');
    return (
      <View style={styles.container}>
        <DotLottieReact
          src="https://lottie.host/36416a02-61a3-4459-a2f1-085336f43a3b/LpC8y1dylO.lottie"
          loop
          autoplay
          style={{ width: 64, height: 64 }}
        />
      </View>
    );
  }
  // Only import lottie-react-native on native
  const LottieView = require('lottie-react-native').default;
  return (
    <View style={styles.container}>
      {/* Replace require with your local .json file path */}
      <LottieView
        source={require('../assets/loader/handLoader.json')}
        autoPlay
        loop
        style={{ width: 64, height: 64 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Loader;
