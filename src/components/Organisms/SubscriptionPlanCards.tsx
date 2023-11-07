import React, { useState, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated';
import { screenHeight } from '../../utils/Data/data';
import SubCard from '../Molecules/SubCard';
import Pagination from '../Atoms/Pagination';

const SubscriptionPlanCards: React.FC<{
  data: { key: string }[];
  pagination: boolean;
}> = ({ data, pagination }) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView | null>(null);
  const [newData, setNewData] = useState<{ key: string }[]>([
    { key: 'spacer-left' },
    ...data,
    { key: 'spacer-right' },
  ]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 3;
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);

  useEffect(() => {
    setNewData([{ key: 'spacer-left' }, ...data, { key: 'spacer-right' }]);
  }, [data]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offSet.value = e.contentOffset.x;
    },
  });

  return (
    <View style={styles.Cards}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {newData.map((item, index) => (
          <SubCard
            key={index}
            index={index}
            item={item}
            x={x}
            size={SIZE}
            spacer={SPACER}
          />
        ))}
      </Animated.ScrollView>

      {pagination && <Pagination data={data} x={x} size={SIZE} />}
    </View>
  );
};

const styles = StyleSheet.create({
  Cards: {
    height: screenHeight * 0.6,
  },
});

export default SubscriptionPlanCards;
