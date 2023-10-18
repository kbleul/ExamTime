import React, { useState ,useRef} from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const Index: React.FC = () => {
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const data: number[] = [0, 1, 2]; // Example data for cards

  const handleIndexChanged = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCardPress = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(index - currentIndex);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={true}
        index={currentIndex}
        onIndexChanged={handleIndexChanged}
        containerStyle={styles.swiperContainer}
        style={styles.swiper}
        activeDotColor="green"
        dotColor="grey"
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        removeClippedSubviews={false}
        autoplay // Enable autoplay for automatic scrolling
        autoplayTimeout={3} // Set the timeout between autoplay transitions (in seconds)
      >
        {data.map((item, index) => (
          
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(index)}
            style={[
              styles.card,
              { backgroundColor: index === 0 ? 'blue' : index === 1? 'yellow' : 'green' },
            ]}
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop:30,
    backgroundColor:"red",
    height:300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperContainer: {
    backgroundColor:"black",
    padding:10,
    
     height: 300,
    width: width - 10,
   
  },
  swiper: {},
  card: {
    marginLeft:-30,
     flex: 1,
    width: width - 100 ,
    // height: 300,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});

export default Index;