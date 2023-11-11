import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { screenWidth, screenHeight } from '../../../utils/Data/data';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BackWithItem from '../../../components/Organisms/BackWithItem';

const Index = ({ progress = 70 }) => {
  const weeks = [
    {
      id: 1,
      isActive: false,
    },
    {
      id: 2,
      isActive: false,
    },
    {
      id: 3,
      isActive: true,
    },
    {
      id: 4,
      isActive: false,
    }
  ]
  return (
    <View style={styles.container}>
      <View style={styles.backicon}>
        <BackWithItem type="Study section" />
      </View>
      <View style={styles.Headercontainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Keep going, you're almost there! The study challenge is testing your limits and preparing you for greatness.
          </Text>

        </View>
        <View style={styles.right}>

          <AnimatedCircularProgress
            size={100}
            width={5}
            backgroundWidth={4}
            fill={progress}
            tintColor="white"
            backgroundColor="#FFE48F"
            rotation={0}
          >
            {(fill) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>

                <Text style={{ fontSize: 25, fontWeight: 'bold', color: "white" }}>
                  {Math.round(fill)}%
                </Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: "white" }}>
                  Complated
                </Text>
              </View>

            )}
          </AnimatedCircularProgress>
        </View>
      </View>

      <View style={styles.weeksContainer}>
        {weeks.map((week) => (
          <View
            key={week.id}
            style={[
              styles.weekContainer
            ]}
          >
            <Text style={styles.weekText}>Week</Text>
            <View
              style={[
                styles.circle,
                week.isActive ? styles.activeCircle : styles.inactiveCircle,
              ]}
            >
              <Text style={week.isActive ? styles.idActiveText : styles.idInActiveText}>{week.id}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.ThisContainer}>
<Text>kjs</Text>
      </View>
    </View>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backicon: {
    marginTop: screenHeight * 0.023,
  },
  Headercontainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: screenWidth - 20,
    height: screenHeight / 6,
    borderRadius: 10,
  },
  textContainer: {
    width: '70%',
    alignItems: 'flex-start',
    gap: 10,
    justifyContent: 'space-between',
  },

  text: {
    fontFamily: "PoppinsRegular",
    color: '#FFFFFF',
    fontSize: screenHeight * 0.02,

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  weeksContainer: {
    width: screenWidth - 20,
    height: screenHeight / 8,
    marginHorizontal: 10,
    // backgroundColor: "yellow",
    padding: screenWidth * 0.002,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  weekContainer: {
    gap: 5,
    alignItems: 'center',
  },

  weekText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  inactiveCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAEE',
  },
  idInActiveText: {
    fontSize: 18,
    textAlign:"center",
    fontFamily: "PoppinsMedium",
    color: '#494949',
  },
  idActiveText: {
    textAlign:"center",
    fontSize: 18,
    fontFamily: "PoppinsMedium",
    color: 'white',
  },
  ThisContainer:{
    width: screenWidth - 20,
    
    // height: screenHeight / 8,
    marginHorizontal: 10,
    backgroundColor: "yellow",
    padding: screenWidth * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation:2
  }
});

export default Index;