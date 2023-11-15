import React, { useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import SubjectHeader from '../molecules/SubjectHeader';
import SubjectContent from '../molecules/SubjectContent';

interface Subject {
  unit: string;
  lesson: string;
  progress: number;
}

interface SubjectAccordionProps {
    SubjectUnikt: Subject[];
}

const SubjectAccordion: React.FC<SubjectAccordionProps> = ({ subjects }) => {
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
    <Accordion
      sections={subjects}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={setActiveSections}
    />
  );
};

export default SubjectAccordion;