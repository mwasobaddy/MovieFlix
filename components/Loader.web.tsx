import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <DotLottieReact
        src="https://lottie.host/36416a02-61a3-4459-a2f1-085336f43a3b/LpC8y1dylO.lottie"
        loop
        autoplay
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
