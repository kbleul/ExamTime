import React, { useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import SubjectHeader from '../Molecules/SubjectHeader';
import SubjectContent from '../Molecules/SubjectContent';
import { StyleSheet, View } from 'react-native';
import { screenHeight, screenWidth } from '../../utils/Data/data';


interface Subject {
  unit: string;
  lesson: string;
  progress: number;
}

interface SubjectAccordionProps {
    SubjectUnikt: Subject[];
}

const SubjectAccordion: React.FC<SubjectAccordionProps> = ({ SubjectUnikt }) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setActiveSections((prevSections) => {
      if (prevSections.includes(index)) {
        return prevSections.filter((sectionIndex) => sectionIndex !== index);
      } else {
        return [...prevSections, index];
      }
    });
  };

  const renderHeader = (section: Subject, index: number, isActive: boolean) => {
    return (
      <SubjectHeader
        section={section}
        index={index}
        isActive={isActive}
        onPress={toggleSection}
      />
    );
  };

  const renderContent = (section: Subject) => {
    return <SubjectContent section={section} />;
  };

  return (
    <View style={styles.SubjectList}>
    <Accordion
      sections={SubjectUnikt}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={setActiveSections}
      containerStyle={styles.accordion}
      
    />
    </View>
  );
};
const styles = StyleSheet.create({
  accordion: {
    backgroundColor:"white",
    marginBottom: 10, // Adjust the margin bottom value as needed
  },
    SubjectList: {
      alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FAFCFA',
        paddingVertical: '2%',
        paddingHorizontal:"2%",
        marginBottom: screenHeight * 0.006,
        width: screenWidth - 20,
        borderColor: "lightgrey",
        borderWidth: 1,
        borderRadius: screenWidth * 0.03,
        marginHorizontal: screenWidth * 0.03,

        
    },
  }
);
export default SubjectAccordion;