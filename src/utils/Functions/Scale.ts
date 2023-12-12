import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = (size:number, factor = 0.1) => {
  const newSize = (width + height) * factor * (size / 100);
  return Math.round(newSize);
};

export default scale;
