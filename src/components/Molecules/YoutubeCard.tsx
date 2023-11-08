import React from 'react'
import {StyleSheet, View, Text,Image,Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
type  YoutubeCardProps={
    item:any,
   
  }
const YoutubeCard:React.FC<YoutubeCardProps> = ({item})=>{
    const Width=Dimensions.get('window').width
    return (
        
            <View style={{width:Width,padding:10}}>
             <Image
             source={item.image}
             style={{width:'100%',height:200,borderRadius:10}}
             />
             <Ionicons style={styles.Youtube} name='logo-youtube'color={'red'}size={150}/>
             <Text style={styles.YoutubeText}>
               {item.text}
             </Text>
            </View>
        
    )
}

const styles = StyleSheet.create({
    Youtube:{
        position:'absolute',
        top:'45%',
        left:'45%',
        transform:[{translateX:-50},{translateY:-50}]
      },
      YoutubeText:{
        fontFamily:'Poppins',
        fontWeight:'700',
        fontSize:12,
        lineHeight:14,
        borderRadius:25,
        backgroundColor:'white',
        color:'#5CADFC',
        padding:10,
        position:'absolute',
        top:20,
        left:15
      },
})

export default YoutubeCard