import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {ScaledSheet, ms} from 'react-native-size-matters';
interface TextHeadingProps {
    text: string;
}

const TextHeading: React.FC<TextHeadingProps> = ({ text }) => {
    return <Text style={styles.heading}>{text}</Text>;
};

const styles = ScaledSheet.create({
    heading: {
        color: '#858585',
        fontFamily: 'PoppinsRegular',
        fontSize: '16@ms',
        paddingHorizontal: '20@s',

    },
});

export default TextHeading;