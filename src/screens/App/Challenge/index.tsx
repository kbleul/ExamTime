import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableNativeFeedback, ToastAndroid, TouchableOpacity, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from '../../../utils/Data/data';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Divider } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
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
  const [activeSections, setActiveSections] = useState([]);

  const renderSectionTitle = (section: any) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const renderHeader = (section: any) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section: any) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.backicon}>
        <BackWithItem type="Study section" />
      </View>
      <View style={styles.Headercontainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Keep going, you're almost there! The study challenge is testing your limits and preparing you for greatness.
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

      <View style={styles.weeksContainer}>
        {weeks.map((week) => (
          <View
            key={week.id}
            style={[
              styles.weekContainer
            ]}
          >
            <Text style={styles.weekText}>Week</Text>
            <View
              style={[
                styles.circle,
                week.isActive ? styles.activeCircle : styles.inactiveCircle,
              ]}
            >
              <Text style={week.isActive ? styles.idActiveText : styles.idInActiveText}>{week.id}</Text>
            </View>
          </View>
        ))}
      </View>

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

      <View style={styles.SubjectList}>
        {SubjectUnikt.map((subject) =>
          <View>
            <TouchableOpacity
              style={styles.lcontainer}
              onPress={() => console.log("sjfd")}
            >

              <View style={styles.imgContainer}>
                <ImageBackground
                  style={styles.imagebg}
                  source={require('./book.png')}
                >
                  <Text>{''} </Text>
                </ImageBackground>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.subject}>{subject.Lesson}</Text>
                <Text style={styles.units}>{subject.unit} units</Text>
                <View style={styles.indicatorContainer}>
                  {/* <Text style={}></Text> */}
                </View>
                <Text style={styles.progressText}>{subject.progress}% completed</Text>
              </View>
            </TouchableOpacity>
          </View>)}
        <View>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
          />
        </View>

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
    height: screenHeight / 6,
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
  idInActiveText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    color: '#494949',
  },
  idActiveText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "PoppinsMedium",
    color: 'white',
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
    marginHorizontal: 2,
    marginVertical: 10,
    elevation: 1,
    borderRadius: 1,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  content: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});

export default Index;