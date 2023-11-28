import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    FlatList,
} from 'react-native';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import { ScaledSheet } from 'react-native-size-matters';
import { screenHeight, screenWidth } from '../../../utils/Data/data';
import { useNavigation } from '@react-navigation/native';
const courses = [
    { subject: 'Subject 1', units: 8, progress: 0 },
    { subject: 'Subject 2', units: 8, progress: 0 },
    { subject: 'Subject 2', units: 8, progress: 0 },
    { subject: 'Subject 2', units: 8, progress: 0 },
    { subject: 'Subject 2', units: 8, progress: 0 },
    // Add more courses here...
];
const CourseItem = ({ item }) => (

    <TouchableOpacity
        style={styles.lcontainer}
        onPress={() => console.log("sjfd")}
    >
        <View style={styles.imgContainer}>
            <ImageBackground
                style={styles.imagebg}
                source={require('./course.png')}
            >
                <Text>{''} </Text>
            </ImageBackground>
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.units}>{item.units} units</Text>
            <View style={styles.indicatorContainer}>
                {/* <Text style={}></Text> */}
            </View>
            <Text style={styles.progressText}>{item.progress}% completed</Text>
        </View>
    </TouchableOpacity>
);
const Index = () => {
  const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* <ScrollView
                showsVerticalScrollIndicator={false}> */}
                <View style={styles.backicon}>
                    <BackWithItem type="Study section" />
                </View>
                <View style={styles.Headercontainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                        Join the challenge phase and get a structured timeline of tasks to help you achieve your study goals!
                        </Text>
                        <TouchableWithoutFeedback onPress={() =>   navigation.navigate('ChallengeScreen')}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Start Challenge</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Image source={require('./course.png')} style={styles.image} />
                </View>

                <FlatList
                    data={courses}
                    renderItem={({ item }) => <CourseItem item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            {/* </ScrollView> */}
            <MainBottomNav />
        </View>
    );
};

const styles = ScaledSheet.create({
    backicon: {
        marginTop: '25@ms',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: screenWidth,
        backgroundColor: '#F9FCFF',
        // backgroundColor: 'red',
    },
    Headercontainer: {
        marginVertical: 15,
        marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#FFA500',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: '10@ms',
        width: screenWidth - 20,
        height: screenHeight / 6,
        borderRadius: 10,
        // margin:10,
        // overflow: 'hidden'
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
        fontSize: screenHeight * 0.015,
    },
    button: {
        backgroundColor: 'white',
        width: '80%',
        height: screenHeight * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonText: {
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000',
        fontFamily: "PoppinsSemiBold",
        fontSize: screenHeight * 0.017,
    },
    image: {
        width: '40%',
        height: screenHeight / 6 + 10,
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
        top: -10,
        bottom: 0
    },
    imageBg: {
        height: '25%',
        width: '100%',
        padding: '10@ms',
        justifyContent: 'center',
        alignItems: 'center',
    },


    lcontainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#EDF7F6',
        width: '96%',
        marginLeft: '2%',
        padding: '1%',
        marginHorizontal: 2,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: "#E1E1E1",
        borderWidth: 1,
    },
    imgContainer: {
        width: '30%',
        padding: 4,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderBottomLeftRadius: 10,
    },
    imagebg: {
        width: '100%',
        height: 105,
        borderRadius: 10,

    },
    infoContainer: {
        width: '70%',
        padding: 10,
        backgroundColor: 'white',
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        justifyContent: 'flex-end',
    },
    subject: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        textTransform: 'capitalize',
        color: '#1E90FF',
    },
    units: {
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
        textTransform: 'capitalize',
        color: '#858585',
        paddingVertical: 2,
    },
    indicatorContainer: {
        width: '100%',
        height: 6,
        borderRadius: 10,
        backgroundColor: '#e8e6e6',
    },
    progressText: {
        color: '#858585',
    },

});
export default Index;
