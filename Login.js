import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import LoginScreen from "react-native-login-screen";
import NormalHealth from "./NormalHealth";
import AbnormalHealth from "./AbnormalHealth";
import AsyncStorage from '@react-native-community/async-storage';

import MQTT from 'react-native-mqtt-new';




export default function App(props) {

  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const [flag, setflag] = useState(0);
  const [flag1, setflag1] = useState(0);
  const [videourl, setvideourl] = useState("");
  const [usernameentered, setusernameentered] = useState("");
  const [passwordentered, setpasswordentered] = useState("");
  const [mqflag, setmqflag] = useState(0);


  // useEffect(() => {

  //   // console.log("*********token**************")

  //   // console.log(props.tokenvalue)
  //   // console.log(props.tokenvalue.token)


  //   // console.log("*********token**************")

  //   // if (flag1 == 4) {
  //   //   mqttfunctioncheckingsubscribe()
  //   //   setflag1(0)
  //   // }

  // });

  function callbackabnormal(test) {

    console.log("++++++++++++++++++++++++++++++++PATIENT IS NORMAL++++++++++++++++++++++++++++++++++++" + test)

    setflag(1)
    // setflag1(4)

  }



  





  if (flag == 0) {

    return (
      <View>

        <LoginScreen
          spinnerEnable
          disableSettings={true}
          backgroundColor={"ffffff"}
          // loginButtonBackgroundColor={"#0db1fc"}
          source={require('./push1.jpg')}
          logoComponent={<Text style={{ fontSize: 30, color: "white", justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '20%', fontWeight: "bold" }}>HAR APP</Text>}

          disableSignupButton={true}
          spinnerVisibility={spinnerVisibility}
          labelTextStyle={{
            color: "#adadad",
            fontFamily: "Now-Bold",
          }}
          logoTextStyle={{
            fontSize: 27,
            color: "#fdfdfd",
            fontFamily: "Now-Black",
          }}
          loginButtonTextStyle={{
            color: "#fdfdfd",
            fontFamily: "Now-Bold",
            fontSize: 20,


          }}
          textStyle={{
            color: "#757575",
            fontFamily: "Now-Regular",
          }}
          signupStyle={{
            color: "#fdfdfd",
            fontFamily: "Now-Bold",
          }}
          usernameOnChangeText={(username) => { 
            setusernameentered(username)
            AsyncStorage.setItem('loginstatus', ("0"));                 

           }}
          onPressSettings={() => alert("Settings Button is pressed")}
          passwordOnChangeText={(password) => { setpasswordentered(password) }}
          onPressLogin={() => {
            setSpinnerVisibility(true);
            setTimeout(() => {
              // setSpinnerVisibility(false);
              if (usernameentered == "") {
                alert("Please enter Username ")
              }
              else if (passwordentered == "") {
                alert("Please enter Password ")
              }

              else if (usernameentered == "Health" && passwordentered == "health") {
                

                MQTT.createClient({
                  uri: 'mqtt://broker.hivemq.com:1883',
                  clientId: 'your_client_id'
                }).then(function (client) {
                  client.on('closed', function () {
                    // console.log('mqtt.event.closed');
                  });
                  client.on('error', function (msg) {
                    // console.log('mqtt.event.error', msg);
            
                  });
            
                  client.on('message', function (msg) {
                    // console.log('mqtt.event.message', msg);            
                    // console.log(msg.data)            
                    // console.log("********** substring*********")
                    var splitStr = msg.data.substring(msg.data.indexOf(',') + 1);
                    // console.log(splitStr)
            
                    var videourlupdated = "http://" + splitStr + ":8000"

                    if (msg.data.substring(0,2) =="1,"){            
                    console.log(videourlupdated)
                    setvideourl(videourlupdated)
                    }

                    else {

                      console.log ("$$$$$$$$$$$$$$$$$default mqtt$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ "+ (msg.data.substring(0,2)))
                    }
            
                    console.log("********** substr333333333333ing*********")
                    console.log (msg.data )

                   console.log ( msg.data.substring(0,2))

                    console.log (flag)
                    console.log("********** substr333333333333ing*********")


            

                    if (msg.data.substring(0,2) =="1,"){

                      console.log ("if called")
                      console.log (msg.data.substring(0,1))

                        setflag(2)
                        AsyncStorage.setItem('loginstatus', ("1"));               
                          


                    }

                    else{

                      console.log ("else called")

                      console.log (flag)
                     
                        // console.log('cart value'+cart.length);

                        AsyncStorage.getItem('loginstatus').then((loginstatus) => {

                          console.log ("())))))))))))))loginstatus)))))))))))))))")

                          console.log(loginstatus)

                          if (loginstatus == 0){
                            setflag(1)
                          }

                          else {

                          }                       
  
                          console.log ("()))))))))))))))))))))))))))))")

                        })


                      // setflag(1)

                    }

            
                  });
            
                  client.on('connect', function () {
                    console.log('+++++++++++++connected+++++++++++++++++');

                    setTimeout(() => {
                      setSpinnerVisibility(false);
                              setflag(1)


                    }, 2000);


                    client.subscribe('HAR-AS', 0);
                    client.publish('HAR-US', props.tokenvalue.token, 0, false);
                    // setflag(1)

            
                    // if (flag1 == 4) {
                    //   client.publish('HAR-AS', "0", 0, false);
                    //   setflag(1)
            
            
                    // }
                  });

                  // setflag(1)

            
                  client.connect();
                }).catch(function (err) {
                  console.log(err);
                });
                // console.log (usernameentered)
                // console.log (passwordentered)

              }

              else {

                alert("Entered Username and Password is incorrect")
              }

            }, 1000);

          }}
         
        >

        </LoginScreen>

      </View>
    )
  }

  else if (flag == 1) {

    return (

      <NormalHealth />

    )
  }

  else if (flag == 2) {

    return (
      <AbnormalHealth callback={callbackabnormal} videourl={videourl} />



    )
  }

}


