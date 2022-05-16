import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text, Alert,Dimensions,Switch,TouchableOpacity} from 'react-native'
import { WebView } from 'react-native-webview';
import MQTT from 'react-native-mqtt-new';


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export default function App(props) {

 


  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(!isEnabled1);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(!isEnabled2);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [livevideo, setlivevideo] = useState("");



  useEffect(() => {

    console.log ("******************url**************")

    console.log (props.video
      )

    setlivevideo(props.videourl)

    console.log ("******************url**************")


    

  }

  )




  const toggleSwitch3 = () =>{
    setIsEnabled3(!isEnabled3);
    if(isEnabled3){
      console.log(isEnabled3)
    }
  }

  function mqttfunctioncheckingpublish(){

  props.callback("3984738974")
  
  
  }

  

  TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={mqttfunctioncheckingpublish} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
  
return(
  <View style={{flex:1}}>
    <WebView
      allowsFullscreenVideo
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction
      style={{width:windowWidth,height:windowHeight}}
    // source={{ uri: 'https://www.youtube.com/watch?v=DxIDKZHW3-E' }} 
    // source={{ uri: 'http://192.168.1.2:8000/' }} 

    source={{ uri: props.videourl}} 

/>
    <View style={{flex:1,padding:'15%',justifyContent:'center'}}>


    {/* <Text style={{textAlign:'center',fontSize:10, fontWeight:'bold',marginTop:20,color:"red"}}>LIVE ip is {props.videourl} </Text> */}

    <Text style={{textAlign:'center',fontSize:30, fontWeight:'bold',marginTop:20,color:"red"}}>ACTIVITY IS ABNORMAL {
        
    }
    </Text>
    

    <View style={styles.screenContainer}>
      <AppButton title="Activity is normal press here!!" size="sm" backgroundColor="#007bff" />
    </View>
  </View>
  </View>
    );
    
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#05b311",
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 15
    },
    appButtonText: {
      fontSize: 10,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });