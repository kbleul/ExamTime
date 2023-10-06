import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {DummyDataScience} from '../../../utils/Data/data';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import AuthPrompt from '../../../components/Organisms/AuthPrompt';
import SignedUpHeader from '../../../components/Organisms/SignedUpHeader';
import SubjectsBox from '../../../components/Molecules/subjectsBox';
import GradeButton from '../../../components/Atoms/GradeBtn';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';

const Index = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <View style={style.container}>
        {user ? (
          <SignedUpHeader type="Dashboard" />
        ) : (
          <TrialHeader type="Dashboard" />
        )}
        {!user && <AuthPrompt />}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={style.gradesBtnContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={style.scrollViewContentContainer}>
              {DummyDataScience.map((item, index) => (
                <GradeButton
                  key={index + 'index'}
                  text={item.subjName}
                  index={index}
                  onPress={() => {}}
                  isActive
                />
              ))}
            </ScrollView>
          </View>

          <View style={style.subjectsBoxContainer}>
            {DummyDataScience.map((item, index) => (
              <SubjectsBox
                key={item.subjName + '--index'}
                name={item.subjName}
                index={++index}
              />
            ))}
          </View>
        </ScrollView>

        <MainBottomNav />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '98%',
    flexGrow: 1,
    padding: 5,
    overflow: 'hidden',
    marginHorizontal: '1%',
    backgroundColor: '#fff',
    paddingVertical: 30,
  },
  mainScrollview: {
    marginBottom: 36,
    paddingBottom: 36,
  },
  gradesBtnContainer: {
    width: '100%',
    marginVertical: 5,
  },
  subjectsBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 43,
  },
  scrollViewContentContainer: {
    width: 'auto',
  },
});
export default Index;
