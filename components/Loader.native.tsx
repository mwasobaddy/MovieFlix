import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      {/* Replace require with your local .json file path */}
      <LottieView
        source={require('../assets/loader/handLoader.json')}
        autoPlay
        loop
        style={{ width: 264, height: 264 }}
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
