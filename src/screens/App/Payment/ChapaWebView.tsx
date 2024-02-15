import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

const ChapaWebView = ({route}: {route: any}) => {
  const {checkout_url, textReference} = route.params;

  console.log(
    '----------------------------------------------------',
    checkout_url,
    textReference,
  );

  return (
    <WebView
      source={{
        uri: 'https://checkout.chapa.co/checkout/payment/lmRf5sOpm7UhWXh7om3wXNA8KXM9MYDhK3KUVYruRDDHf',
      }}
      style={{flex: 1}}
    />
  );
};

export default ChapaWebView;
