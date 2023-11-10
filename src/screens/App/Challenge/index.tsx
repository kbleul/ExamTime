import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { screenWidth, screenHeight } from '../../../utils/Data/data';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Index = ({ progress = 70 }) => {

  return (
    <View style={styles.container}>
      <View style={styles.Headercontainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Find your path to success through new knowledge
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
    </View>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Headercontainer: {
    marginVertical: 65,
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
    width: '60%',
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
}); 

export default Index;