import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';


type  PrimaryBtnProps={
  title:String,
  body:any
 
}
const GuideTexts:React.FC<PrimaryBtnProps>= ({title,body}) => {
  return (
    <View style={{padding:10}}>
    <Text style={styles.GuideheaderText}>
        {title}
    </Text>
    <Text style={styles.GuideBodyText}>
      {body}
    </Text>
    
    </View>
  )
}

const styles  = StyleSheet.create({
    GuideheaderText:{
        fontWeight:"500",
        fontSize:18,
        fontFamily:"Poppins",
        lineHeight:27,
        color:"#4D4D4D"
      },
      GuideBodyText:{
        fontFamily:'Poppins',
        fontSize:14,
        lineHeight:21,
        fontWeight:'400',
        color:'#4D4D4D'
      },
})
export default GuideTexts

