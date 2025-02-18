import React from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ScaledSheet} from 'react-native-size-matters';
import LoadingRegions from '../Atoms/LoadingRegions';
import RegionError from '../Atoms/RegionError';

interface DropdownForRegionFieldProps {
  regionsListItems: DropdownItem[];
  isFocusRegion: boolean;
  region: string;
  setIsFocusRegion: (isFocus: boolean) => void;
  setRegion: (value: string) => void;
  isLoadingRegions: boolean;
  regionError: boolean;
}

const DropdownForRegionField: React.FC<DropdownForRegionFieldProps> = ({
  regionsListItems,
  isFocusRegion,
  region,
  setIsFocusRegion,
  setRegion,
  isLoadingRegions,
  regionError,
}) => {
  return (
    <View style={dropDownStyle.container}>
      <Dropdown
        style={dropDownStyle.dropdown}
        placeholderStyle={dropDownStyle.placeholderStyle}
        selectedTextStyle={dropDownStyle.selectedTextStyle}
        inputSearchStyle={dropDownStyle.inputSearchStyle}
        itemTextStyle={dropDownStyle.itemListStyle}
        iconStyle={dropDownStyle.iconStyle}
        data={regionsListItems}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusRegion ? 'Select region' : '...'}
        searchPlaceholder="Search..."
        value={region}
        onFocus={() => setIsFocusRegion(true)}
        onBlur={() => setIsFocusRegion(false)}
        onChange={item => {
          setRegion(item.value);
          setIsFocusRegion(false);
        }}
      />
      {isLoadingRegions && <LoadingRegions />}
      <RegionError error={regionError} />
    </View>
  );
};

export const dropDownStyle = ScaledSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#abcef5',
    borderWidth: 1,
    borderRadius: '10@ms',
    overflow: 'hidden',
    fontFamily: 'PoppinsRegular',
    flexDirection: 'row',
    marginHorizontal: '20@s',
    marginVertical: '5@vs',
    paddingHorizontal: '20@s',
  },
  dropdown: {
    width: '100%',
    height: '42@vs',
    color: '#d4d4d4',
  },
  placeholderStyle: {
    fontSize: '14@vs',
    color: '#d4d4d4',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#d4d4d4',
  },
  itemListStyle: {
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});

export default DropdownForRegionField;
