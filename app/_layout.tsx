import * as Font from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import Loader from "../components/Loader";
import "./globals.css";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      "Roboto-Regular": require("../assets/fonts/Roboto/static/Roboto-Regular.ttf"),
      "Roboto-Bold": require("../assets/fonts/Roboto/static/Roboto-Bold.ttf"),
      "Roboto-Medium": require("../assets/fonts/Roboto/static/Roboto-Medium.ttf"),
      "Roboto-Light": require("../assets/fonts/Roboto/static/Roboto-Light.ttf")
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <Loader />;
  }

  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
