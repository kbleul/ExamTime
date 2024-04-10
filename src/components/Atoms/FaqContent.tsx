import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {faqType} from '../Molecules/Accordion';
import {handleClickLink} from '../../utils/Functions/Get';
import ViewYoutubeModal from '../Molecules/ViewYoutubeModal';

const FaqContent = ({faqContent}: {faqContent: faqType}) => {
  const [viewYoutubeLink, setViewYoutubeLink] = useState<string | null>(null);

  return (
    <View style={styles.content}>
      <Text style={styles.contenttext}>{faqContent.answer}</Text>

      {faqContent.links && faqContent.links.length > 0 && (
        <View style={styles.linksContainer}>
          {faqContent.links.map((link: any, index: number) => (
            <TouchableOpacity
              key={index + '--FAQ--' + index}
              touchSoundDisabled
              onPress={() => handleClickLink(link, setViewYoutubeLink)}>
              <Text style={styles.linksButtonText}>{link.link}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {viewYoutubeLink && (
        <ViewYoutubeModal
          viewYoutubeLink={viewYoutubeLink}
          setViewYoutubeLink={setViewYoutubeLink}
        />
      )}
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
  },
  contenttext: {
    borderRadius: screenWidth * 0.02,
    fontFamily: 'PoppinsRegular',
    color: '#919192',
    fontSize: screenHeight * 0.02,
    paddingRight: 10,
  },
  linksContainer: {
    marginVertical: 20,
    gap: 20,
  },
  linksButtonText: {
    fontFamily: 'PoppinsMedium',
    fontSize: screenWidth * 0.035,
    color: '#5a8edb',
  },
});
export default FaqContent;
