import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableNativeFeedback, ToastAndroid, TouchableOpacity, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from '../../../utils/Data/data';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Divider } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProgressHeader from '../../../components/Organisms/ProgressHeader';
import WeekContainer from '../../../components/Molecules/WeekContainer';
import WeeksScreen from '../../../components/Organisms/WeeksScreem';
import WeekDaysScreen from '../../../components/Organisms/WeekDaysScreen';
import SubjectAccordion from '../../../components/Organisms/SubjectAccordion';

const Index = ({ progress = 70 }) => {

  const SubjectUnikt = [
    { unit: 'Unit One', Lesson: "Cell Biology", progress: 0 },
    { unit: 'Unit Two', Lesson: "Metabolis", progress: 0 },
    { unit: 'Unit Three', Lesson: "Bio-technology", progress: 0 },

    // Add more courses here...
  ];

  const [activeSections, setActiveSections] = useState<number[]>([]);

  const renderHeader = (section: any, index: number, isActive: boolean) => {
    const toggleSection = () => {
      setActiveSections((prevSections) => {
        if (prevSections.includes(index)) {
          return prevSections.filter((sectionIndex) => sectionIndex !== index);
        } else {
          return [...prevSections, index];
        }
      });
    };
    return (
      // <View style={styles.header}>
      <TouchableOpacity style={isActive ? styles.Activelcontainer : styles.lcontainer} onPress={toggleSection}
        activeOpacity={0.8}>

        <View style={styles.imgContainer}>
          <ImageBackground
            style={styles.imagebg}
            source={require('./book.png')}
          >
            <Text>{''} </Text>
          </ImageBackground>
        </View>

        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.subject}>{section.unit}</Text>
            <Text style={styles.units}>{section.Lesson} units</Text>

          </View>
          <Ionicons
            name={isActive ? 'caret-up' : 'caret-down'}
            size={20}
            color="#333333"
          />

        </View>

      </TouchableOpacity>

    );
  };

  const renderContent = (section: any) => {
    return (
      <View style={styles.content}>

        <Text style={styles.contenttext}>
          Your expected ability for this chapter is between 2.0 - 2.4 . Estimated your ability using the following self-assessment.
        </Text>
        <View style={styles.SelfAssessment}>
          <View style={styles.LeftSide}>
            <View style={styles.BlueConatibner}>

            </View>
            <Text style={styles.contentSubText}>
              Self Assessment
            </Text>
          </View>

          <View style={styles.rightSide}>
            <TouchableOpacity>
              <Ionicons
                name={'tablet-landscape-outline'}
                size={20}
                color="#333333"
              />
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.SelfAssessment}>
          <View style={styles.LeftSide}>
            <View style={styles.RedConatibner}>

            </View>
            <Text style={styles.contentSubText}>
              Unit Review Note
            </Text>
          </View>

          <View style={styles.rightSide}>
            <TouchableOpacity>
              <Ionicons
                name={'tablet-landscape-outline'}
                size={20}
                color="#333333"
              />
            </TouchableOpacity>

          </View>
        </View>


        <View style={styles.VedioListContainer}>
          <View style={styles.vedioLeft}>
            <Text style={styles.vedioNumber}>
              01
            </Text>
            <View>
              <Text style={styles.vedioNumber}>
                Get to know about cell biology
              </Text>
              <Text style={styles.vedioNumber}>
                12.05 mins
              </Text>
            </View>

          </View>

          <View style={styles.rightSide}>
            <TouchableOpacity>
              <View style={styles.IconContainer}>
                <Ionicons
                  name={'play'}
                  size={20}
                  color="white"
                />
              </View>

            </TouchableOpacity>

          </View>
        </View>


      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backicon}>
          <BackWithItem type="Challange Section" />
        </View>

        <ProgressHeader />

        <WeeksScreen />

        <WeekDaysScreen />
        <SubjectAccordion SubjectUnikt={[]} />

      </ScrollView>
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




  SubjectList: {
    width: screenWidth - 20,
    marginHorizontal: 10,
    marginVertical: 15,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

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

  sectionContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderRadius: 4,
    elevation: 2,
  },
  header: {
    padding: 16,
    backgroundColor: '#E0E0E0',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,

  },
  headerText: {
    gap: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginVertical: 30,
  },
  content: {
    padding: 6,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    backgroundColor: '#FAFCFA',
    // borderBottomLeftRadius: 4,
    // borderBottomRightRadius: 4,
  },
  AccordionContainer: {
    width: screenWidth - 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  contenttext: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontFamily: "PoppinsRegular",
    color: 'grey',
    fontSize: screenHeight * 0.02,
  },
  SelfAssessment: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    // width: "70%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: screenHeight * 0.02,
  },
  BlueConatibner: {
    height: 40,
    width: 40,
    backgroundColor: "#399BE2",
    borderRadius: 5,
  },
  RedConatibner: {
    height: 40,
    width: 40,
    backgroundColor: "#EB66A3",
    borderRadius: 5,
  },
  contentSubText: {
    fontFamily: "PoppinsRegular",
    color: 'black',
    fontSize: screenHeight * 0.02,
  },
  LeftSide: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightSide: {

  },
  VedioListContainer: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    // width: "70%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: screenHeight * 0.02,
  },
  vedioLeft: {
    gap: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  vedioNumber: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: '#BEB3EA'
  },
  IconContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: "#9A85FC",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Index;