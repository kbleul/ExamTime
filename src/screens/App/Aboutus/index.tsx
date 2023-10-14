import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, ImageBackground } from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxToolkit/Store';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import { ScrollView } from 'react-native-gesture-handler';
import ShareApp from '../../../components/Organisms/ShareApp';

const Index = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
       
        <View style={styles.container}>
 <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* <View style={styles.innerContainer}> */}
                    <View style={styles.backicon}>
                        <BackWithItem type="About Us" isTrial={user ? false : true} />
                    </View>
                 
                        <View style={styles.imageBg}>
                            <Image source={require('../../../assets/Logo/logo1.png')} style={styles.img} />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. progress</Text>
                        </View>

                        <View style={styles.share}>
                            <ShareApp />
                        </View>
            
                  
                {/* </View> */}
                </ScrollView>
            <MainBottomNav />
         
        </View>
      
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flex: 1,
        width: '100%',
        backgroundColor: '#F9FCFF',
    },
    scrollContainer: {
        // backgroundColor: 'red',
        flexGrow: 1,

    },
    innerContainer: {
         flex: 1,
    },
    text: {
        padding: 10,
        fontSize: 13,
        color: '#222E50',
        fontFamily: 'Montserrat-Regular',
    },
    textContainer: {
        // height: '25%',
        padding: 5,
        width: '100%',
        overflow:"hidden"
    },
    imageBg: {
        height: '25%',
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    backicon: {
        marginTop: 25,
    },
    share: {
        //  backgroundColor:"blue",
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 10,
        paddingTop:30
        //  marginBottom: 199
    },
});
export default Index;
