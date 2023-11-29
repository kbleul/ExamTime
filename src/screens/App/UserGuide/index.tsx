import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import PrimaryBtn from '../../../components/Atoms/PrimaryBtn';
import YoutubeCard from '../../../components/Molecules/YoutubeCard';
import GuideTexts from '../../../components/Molecules/GuideHederText';

const Index = () => {
  const navigator = useNavigation<any>();
  const [Index, SetIndex] = useState(0);

  const Width = Dimensions.get('window').width;
  type DataType = {
    id: any;
    image: any;
    text: any;
  };

  const data: DataType[] = [
    {
      id: '01',
      image: require('../../../assets/Images/card.png'),
      text: 'how to subscribe',
    },
    {
      id: '02',
      image: require('../../../assets/Images/pay.png'),
      text: 'how to pay',
    },

    {
      id: '03',
      image: require('../../../assets/Images/How.png'),
      text: 'how to',
    },
  ];
  const handelScroll = useCallback(({viewableItems}) => {
    if (viewableItems.length === 1) {
      SetIndex(viewableItems[0].index);
    }
  }, []);
  const Indicator = () => {
    return data.map((item, index) => {
      if (Index == index) {
        return <View key={index} style={styles.IndectorSubcontainer} />;
      } else {
        return (
          <View key={index} style={styles.IndectorSubcontainerSecondary} />
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Ionicons name="chevron-back-outline" color="#000" size={28} />
        </TouchableOpacity>

        <Text style={styles.headerText}>User Guide</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.Guide}>
          <GuideTexts
            title={'videos'}
            body={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '}
          />
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <YoutubeCard item={item} />}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={styles.FlatListStyle}
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
            onViewableItemsChanged={handelScroll}
          />

          <View style={styles.Indector}>
            <Indicator />
          </View>
          <GuideTexts
            title={'guided tour'}
            body={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '}
          />

          <View style={{padding: 10}}>
            <PrimaryBtn text={'start now'} width={'auto'} />
          </View>
        </View>
      </ScrollView>

      <View>
        <MainBottomNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FCFF',
    flex: 1,
    paddingTop: 30,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  headerText: {
    color: '#0F0F0F',
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'Poppins',
  },

  Guide: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
  },
  FlatListStyle: {
    marginVertical: 4,
    width: Dimensions.get('window').width,
  },
  Indector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  IndectorSubcontainer: {
    backgroundColor: '#0066B2',
    width: 17,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  IndectorSubcontainerSecondary: {
    backgroundColor: '#0066B2',
    width: 17,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default Index;
