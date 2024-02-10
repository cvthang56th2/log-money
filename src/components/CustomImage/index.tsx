import { useState, useMemo, FC } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { BlurView } from "@react-native-community/blur";
import tw from "@lm/configs/tailwindcss";

interface CustomImageProps {
  imageUrl: string;
  style: object;
}
const DEFAULT_THUMBNAIl_IMAGE =
  "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png";
const CustomImage: FC<CustomImageProps> = ({ imageUrl, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setIsImageLoaded(true);
  };

  const fastImage = useMemo(
    () => (
      <FastImage
        source={{
          uri: imageUrl || DEFAULT_THUMBNAIl_IMAGE,
          priority: FastImage.priority.normal,
        }}
        style={tw`flex-1`}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={handleImageLoad}
      />
    ),
    [imageUrl]
  );

  const blurView = useMemo(
    () => (
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
    ),
    []
  );

  return (
    <View style={tw.style("relative", style)}>
      {isLoading && (
        <ActivityIndicator
          style={tw` absolute top-0 left-0 right-0 bottom-0`}
        />
      )}

      {isImageLoaded ? fastImage : fastImage}

      {!isImageLoaded && blurView}
    </View>
  );
};

export default CustomImage;
