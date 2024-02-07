import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

const ChapaWebView = () => {
  return <WebView source={{uri: '#'}} style={{flex: 1}} />;
};

export default ChapaWebView;
