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

const Index = ({ progress = 70 }) => {
  const showToast = () => {
    ToastAndroid.show('View Calander', ToastAndroid.SHORT);
  };
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
  const days = [
    {
      dayNumber: 30,
      dayName: "Sun",
      isActive: true,
    },
    {
      dayNumber: 1,
      dayName: "Mon",
      isActive: false,
    },
    {
      dayNumber: 2,
      dayName: "Tue",
      isActive: false,
    },
    {
      dayNumber: 3,
      dayName: "Wed",
      isActive: false,
    },

    {
      dayNumber: 5,
      dayName: "Thu",
      isActive: false,
    },
    {
      dayNumber: 6,
      dayName: "Fri",
      isActive: false,
    },
    {
      dayNumber: 7,
      dayName: "Sat",
      isActive: false,
    }
  ]
  const SubjectUnikt = [
    { unit: 'Unit One', Lesson: "Cell Biology", progress: 0 },
    { unit: 'Unit Two', Lesson: "Metabolis", progress: 0 },
    { unit: 'Unit Three', Lesson: "Bio-technology", progress: 0 },

    // Add more courses here...
  ];
  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
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
        <View style={styles.ThisContainer}>
          <View style={styles.ThisContainerHeader}>
            <Text style={styles.ThisContainerHeaderWeekText}>Week</Text>

            <TouchableNativeFeedback onPress={showToast}>
              <View style={styles.ViewCalander}>
                <Text style={styles.calandertext}>View Calander</Text>
                <Icon name="angle-right" size={15} color="#908F92" />
              </View>
            </TouchableNativeFeedback>

          </View>
          <View style={styles.divider} />
          {/* <Divider style={{ flex: 1, width: "100%", height: 2, backgroundColor: 'red' }} /> */}
          <View style={styles.weekdaysContainer} >
            {days.map((week) => (

              <View
                key={week.dayNumber}
                style={[
                  week.isActive ? styles.ActiveweekDaysContainer : styles.inActiveweekDaysContainer,
                ]}
              >
                <Text style={week.isActive ? styles.ActiveweekText : styles.inActiveweekText}>{week.dayName}</Text>
                <View
                  style={[
                    styles.circle,
                    week.isActive ? styles.ActiveweekDaysTextCircle : styles.inActiveweekDaysTextCircle,
                  ]}
                >
                  <Text style={styles.weekDaysText}>{week.dayNumber}</Text>
                </View>
                <View style={week.isActive ? styles.dotActive : styles.dotInactive} />
              </View>

            ))}

          </View>
        </View>

        <View style={styles.AccordionContainer}>
          <Accordion
            sections={SubjectUnikt}
            activeSections={activeSections}
            // renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSections}
          />
        </View>
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

  ThisContainer: {
    width: screenWidth - 20,
    marginHorizontal: 10,
    padding: screenWidth * 0.02,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: "#FAFCFA"



  },
  ThisContainerHeader: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%"
  },
  ThisContainerHeaderWeekText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "PoppinsMedium",
    color: '#BBBCC3',
  },
  ViewCalander: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  calandertext: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins",
    color: '#BBBCC3',
  },
  divider: {
    width: "100%",
    marginVertical: 10,
    marginHorizontal: 122,
    height: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  weekdaysContainer: {
    padding: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%"
  },
  ActiveweekDaysContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  inActiveweekDaysContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: "center",
    // backgroundColor: '#E8EAEE',
  },
  ActiveweekText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "PoppinsMedium",
    color: 'white',
    paddingBottom: 15,
  },
  inActiveweekText: {
    paddingBottom: 15,
    textAlign: "center",
    fontSize: 15,
    fontFamily: "PoppinsMedium",
    color: '#828484',
  },
  ActiveweekDaysTextCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  inActiveweekDaysTextCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAEE',
    borderRadius: 50,
  },
  weekDaysText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    color: '#2A3061',
  },
  dotActive: {
    marginTop: 5,
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: "#FDC738"
  },
  dotInactive: {
    marginTop: 5,
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: "#1E90FF"
  },
  SubjectList: {
    width: screenWidth - 20,
    marginHorizontal: 10,
    marginVertical: 15,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },

  lcontainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FAFCFA',
    padding: '1%',
    marginBottom: 5,
    width: screenWidth - 20,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 10,

  },
  Activelcontainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FAFCFA',
    padding: '1%',
    // marginBottom: 5,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0

  },
  imgContainer: {
    width: '20%',
    padding: 8,
  },
  imagebg: {
    width: '100%',
    height: 80,
    objectFit: "cover",
  },
  infoContainer: {
    width: '80%',
    padding: 10,
    flexDirection: "row",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    alignItems: "center",
    justifyContent: 'space-between',
  },
  subject: {
    fontSize: 18,
    fontFamily: 'PoppinsMedium',
    textTransform: 'capitalize',
    color: '#1E90FF',
  },
  units: {
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
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