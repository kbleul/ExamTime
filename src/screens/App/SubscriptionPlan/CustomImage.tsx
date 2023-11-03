import { StyleSheet, Text, Image, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CustomImage = ({ item, x, index, size, spacer }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  // Get Image Width and Height to Calculate AspectRatio
  useLayoutEffect(() => {
    if (item.image) {
      const { width, height } = Image.resolveAssetSource(item.image);
      setAspectRatio(width / height);
    }
  }, [item.image]);

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * size, (index - 1) * size, index * size],
      [0.8, 1, 0.8],
    );
    return {
      transform: [{ scale }],
    };
  });
console.log("Item", item)
  const { available, packagesname } = item;
  return (
    <View style={{ width: size }} key={index}>
      <Animated.View style={[styles.imageContainer, style]}>

        <View style={styles.popularContainer}>
          <Text style={styles.popularText}>Popular</Text>
        

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {available ? (
              <AntDesign
                name="check"
                size={20}
                color="green"
                style={{ marginRight: 5 }}
              />
            ) : (
              <AntDesign
                name="close"
                size={20}
                color="red"
                style={{ marginRight: 5 }}
              />
            )}
            <Text style={styles.listofPackagesText}>{packagesname}</Text>
          </View>
        {/* Card Content */}

      </Animated.View>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 250,
    height: 350,
    borderWidth: 2,
    borderColor: 'orange',

  },
  listofPackagesText: {
    color: '#222E50',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  image: {
    width: '100%',
    height: undefined,
  },
  popularContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'orange',
    padding: 3,
    borderRadius: 3,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
