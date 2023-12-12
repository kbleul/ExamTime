import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FAQ, screenHeight, screenWidth} from '../../utils/Data/data';

import Accordion from 'react-native-collapsible/Accordion';
import FaqHeader from '../Atoms/FaqHeader';
import FaqContent from '../Atoms/FaqContent';

const AccordionComponet = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const toggleSection = (index: number) => {
    setActiveSections(prevSections => {
      if (prevSections.includes(index)) {
        return prevSections.filter(sectionIndex => sectionIndex !== index);
      } else {
        return [...prevSections, index];
      }
    });
  };
  const renderHeader = (faqQuestion, index: number, isActive: boolean) => {
    return (
      <FaqHeader
        faqQuestion={faqQuestion}
        index={index}
        isActive={isActive}
        onPress={toggleSection}
      />
    );
  };

  const renderContent = faqContent => {
    return <FaqContent faqContent={faqContent} />;
  };

  return (
    <Accordion
      sections={FAQ}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={setActiveSections}
      containerStyle={styles.accordion}
    />
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: 'white',
  },
  SubjectList: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FAFCFA',
    paddingHorizontal: '2%',
    marginBottom: screenHeight * 0.006,
    width: screenWidth - 20,
    borderColor: 'lightgrey',
    // borderWidth: 1,
    // borderRadius: screenWidth * 0.03,
    marginHorizontal: 4,
  },
  faqBtn: {
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#0D66D03B',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 10,
    justifyContent: 'flex-start',
  },

  faqBtnActive: {
    borderColor: '#1E90FF',
  },
  faqbtnTxt: {
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 18,
    color: 'black',
  },
  faqbtnTxtActive: {
    fontFamily: 'Montserrat-SemiBold',
  },
  answerTextContener: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#1E90FF',
    textAlign: 'justify',
  },
  span: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
  },
});
export default AccordionComponet;
