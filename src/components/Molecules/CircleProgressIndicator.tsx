import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {scale} from 'react-native-size-matters';
import {style} from '../../screens/App/Study/styles';

const CircleProgressIndicator = ({
  progress,
  isDark,
}: {
  progress: number;
  isDark?: boolean;
}) => {
  let amount =
    typeof Math.round(progress) === typeof Math.round(0)
      ? Math.round(progress)
      : 0;

  if (amount < 0) {
    amount = 0;
  } else if (amount > 100) {
    amount = 100;
  }
  console.log({isDark});
  return (
    <AnimatedCircularProgress
      size={scale(isDark ? 70 : 90)}
      width={isDark ? 6 : 2}
      backgroundWidth={isDark ? 6 : 2}
      fill={progress}
      tintColor={isDark ? '#F0E2A1' : 'white'}
      backgroundColor={isDark ? '#000' : '#FFE48F'}
      rotation={0}>
      {() => (
        <View
          style={
            isDark
              ? styles.circleTextContainerSecondary
              : styles.circleTextContainer
          }>
          <Text
            style={
              isDark
                ? [styles.centerText, styles.centerTextSecondaryColor]
                : styles.centerText
            }>
            {amount}%
          </Text>
          {!isDark && (
            <Text
              style={
                isDark
                  ? [
                      styles.centerTextSecondary,
                      styles.centerTextSecondaryColor,
                    ]
                  : styles.centerTextSecondary
              }>
              Completed
            </Text>
          )}
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  circleTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleTextContainerSecondary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  centerText: {
    fontFamily: 'PoppinsMedium',
    fontSize: scale(24),
    color: 'white',
  },
  centerTextSecondary: {
    fontFamily: 'PoppinsRegular',
    fontSize: scale(7),
    color: 'white',
  },
  centerTextSecondaryColor: {
    fontSize: scale(15),
    color: '#F0E2A1',
  },
});

export default CircleProgressIndicator;
