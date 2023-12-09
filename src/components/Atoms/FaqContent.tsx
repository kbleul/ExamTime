import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth } from '../../utils/Data/data';
import Feather from 'react-native-vector-icons/Feather';



const FaqContent: React.FC = ({ faqContent }) => {

    return (
        <View style={styles.content}>
            <Text style={styles.contenttext}>
                {faqContent.ans}
            </Text>

        </View>
    );
};
const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 4,
        borderColor: '#E1E1E1',
        borderBottomWidth: 1,
    },
    AccordionContainer: {
        marginHorizontal: screenWidth * 0.02,
        marginTop: screenHeight * 0.02,
    },
    contenttext: {
        borderRadius: screenWidth * 0.02,
        fontFamily: 'PoppinsRegular',
        color: '#919192',
        fontSize: screenHeight * 0.018,
    },

});
export default FaqContent;