import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';

import {useNavigation} from '@react-navigation/native';
import PrimaryBtn from '../../../components/Atoms/PrimaryBtn';
import YoutubeCard from '../../../components/Molecules/YoutubeCard';
import GuideTexts from '../../../components/Molecules/GuideHederText';
import {useGetUserGuideMutation} from '../../../reduxToolkit/Services/auth';
import scale from '../../../utils/Functions/Scale';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import { screenHeight, screenWidth } from '../../../utils/Data/data';
import Loading from '../../../components/Atoms/Loading';

const Index = () => {
  const [Index, setIndex] = useState(0);
  const [userGuide, setuserGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getUserGuide] = useGetUserGuideMutation();
  type DataType = {
    id: any;
    image: any;
    text: any;
  };

  useEffect(() => {
    const fetchUserguide = async () => {
      setLoading(true);
      try {
        const response: any = await getUserGuide({});
        if (response.error) {
          Alert.alert(response.error);
        } else if (response.data) {
          setuserGuide(response.data);
          setLoading(false);
        } else {
          Alert.alert(
            'Invalid response format - missing or empty array:',
            response.data[0].aboutUs,
          );
        }
      } catch (error: any) {
        setLoading(false);
        Alert.alert('Error fetching about us data:', error);
      }
    };

    fetchUserguide();
  }, []);

  const handelScroll = useCallback(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  }, []);
  const Indicator = () => {
    return userGuide?.map((item, index) => {
      if (Index === index) {
        return <View key={index} style={styles.IndectorSubcontainer} />;
      } else {
        return (
          <View key={index} style={styles.IndectorSubcontainerSecondary} />
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backicon}>
        <BackWithItem type="User Guide" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Guide}>
          <GuideTexts
            title={'videos'}
            body={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '}
          />
          <FlatList
            data={userGuide}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <YoutubeCard item={item} loadinga={loading} />
            )}
            ListFooterComponent={() => (
              loading ? (
                <View style={styles.loadingIndicator}>
                  <Loading />
                </View>
              ) : null
            )}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={styles.FlatListStyle}
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
            onViewableItemsChanged={handelScroll}
          />

          {userGuide && (
            <View style={styles.Indector}>
              <Indicator />
            </View>
          )}
          <GuideTexts
            title={'Guided tour'}
            body={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '}
          />
        </View>
      </ScrollView>

      <View>
        <MainBottomNav />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FCFF',
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  backicon: {
    marginTop: scale(25),
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  headerText: {
    color: '#0F0F0F',
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'Poppins',
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: screenHeight*0.35,
    width: screenWidth,
    // backgroundColor:"blue"
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
    width: 20,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  IndectorSubcontainerSecondary: {
    backgroundColor: '#0066B2',
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    overflow: 'hidden',
  },
});

export default Index;
