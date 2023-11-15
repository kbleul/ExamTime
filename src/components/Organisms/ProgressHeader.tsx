import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { screenWidth, screenHeight } from '../../utils/Data/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CircleProgressIndicator from '../Molecules/CircleProgressIndicator';

const ProgressHeader = () => {

    return (
        <View style={styles.Headercontainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Keep going, you're almost there! The study challenge is testing your limits and preparing you for greatness.
                </Text>

            </View>
            <View style={styles.right}>
                <CircleProgressIndicator />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        height: screenHeight / 5.5,
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

});

export default ProgressHeader;
