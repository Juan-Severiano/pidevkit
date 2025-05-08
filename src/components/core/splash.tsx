import { Video } from "expo-av";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

type SplashScreenProps = {
  onFinish: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [, setIsVideoReady] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoReady(true);
    setTimeout(() => {
      onFinish();
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {
        <Video
          source={require("../../assets/splashscreen.mp4")}
          style={styles.video}
          // @ts-ignore
          resizeMode="cover"
          shouldPlay
          onLoad={handleVideoLoad}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.sky[950],
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;
