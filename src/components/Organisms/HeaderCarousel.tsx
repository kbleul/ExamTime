import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {CarouselData_guest} from '../../utils/Data/data';
import {
  getItemLayout,
  handleCarouselScroll,
} from '../../utils/Functions/Helper/index';
import CarouselFrame from './CarouselFrame';

interface Item {
  id: string;
  image: any;
}

const screenWidth = Dimensions.get('window').width;

const HeaderCarousel = () => {
  const flatListRef = useRef<FlatList<Item> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  //scroll animation with interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (flatListRef.current) {
      interval = setInterval(() => {
        //return to first carousel item if active is last item
        if (Math.round(activeIndex) >= CarouselData_guest.length - 1) {
          flatListRef.current?.scrollToIndex({
            index: 0,
            animated: true,
          });
        }
        //return scroll to next
        else {
          flatListRef.current?.scrollToIndex({
            index: activeIndex + 1,
            animated: true,
          });
        }
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeIndex]);

  const renderItem = ({item, index}: {item: Item; index: number}) => {
    return (
      <View>
        <CarouselFrame index={index} />
      </View>
    );
  };

  const renderDotIndicators = (currentIndex: number) => {
    return CarouselData_guest.map((_, index) => {
      const isActive = Math.round(currentIndex) === index;

      return (
        <View
          key={index}
          style={
            isActive
              ? [styles.indicator, styles.indicatorActive]
              : styles.indicator
          }
        />
      );
    });
  };

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        ref={flatListRef}
        data={CarouselData_guest}
        renderItem={renderItem}
        getItemLayout={(_, index) => getItemLayout(_, index, screenWidth)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => handleCarouselScroll(e, screenWidth, setActiveIndex)}
      />

      <View style={styles.container}>{renderDotIndicators(activeIndex)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  bgImage: {
    height: 150,
    width: screenWidth,
  },
  indicator: {
    backgroundColor: '#D9D9D9',
    height: 10,
    width: 8,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  indicatorActive: {
    backgroundColor: '#0066B2',
    width: 25,
  },
});

export default HeaderCarousel;
