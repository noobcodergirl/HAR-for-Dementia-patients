
import React from 'react';

//import all the components we are going to use
import { StyleSheet, View, Text, SafeAreaView, Image ,Button,Alert} from 'react-native';

const App = () => {
  return (   
    
      <View style={styles.container}>
        <Text style={{textAlign:'center',fontSize:30,bottom:50, fontWeight:'bold',color:"green"}}>HAR Monitor Status</Text>
        <Image       
          source={require('./normal.jpg')}
          style={{ width: 400, height: 400, margin: 16 }}
        />

{/* <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      /> */}

<Text style={{textAlign:'center',fontSize:20, fontWeight:'bold',marginTop:20,color:"green"}}>ACTIVITY IS NORMAL</Text>
        
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection:'column'
  },
});
export default App;