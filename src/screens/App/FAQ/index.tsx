import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';


const Index = () => {


    return (
        <View style={styles.container}>

            <Text style={styles.text}>This is FAQ us page </Text>
            <MainBottomNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        position: 'relative',
        paddingBottom: 35,
        backgroundColor: '#F9FCFF',
    },
    text:{
        color:"red",
        fontSize:40
    },
    imageBg: {
        height: '35%',
        width: '100%',
        resizeMode: 'cover',
    },
    img: {
        height: '100%',
        width: '100%',
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});
export default Index;