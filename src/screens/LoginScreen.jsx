import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';




const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    /*  <LinearGradient style={{flex:1}} colors={['#040306', '#131624']}>

    </LinearGradient> */

    <LinearGradient
      colors={['#040306', '#131624', '#192f6a']}
      style={styles.linearGradient}>
      <SafeAreaView>
        <View style={{height: 80}} />
        <Entypo
          style={{textAlign: 'center'}}
          name="spotify"
          color="white"
          size={80}
        />
        <Text style={styles.loginTitle}>
          Millions of Songs Free on Spotify!
        </Text>

        <View style={{height: 80}} />

        <Pressable style={styles.spotify}
        onPress={()=>navigation.navigate('Main')}
        >
          <Text style={{fontWeight:'500', fontSize:16}} /* style={styles.signIn} */>Sign In with Spotify!</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <MaterialIcons name="phone-android" color="white" size={25} />
         
          <Text style={styles.buttonText}>Continue with phone number</Text>
        </Pressable>
        <Pressable style={styles.button}> 
          <AntDesign name="google" color="white" size={25}/>
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </Pressable>
        <Pressable style={styles.button}>
        <Entypo
          style={{textAlign: 'center'}}
          name="facebook"
          color="white"
          size={25}
        />
          <Text style={styles.buttonText}>Sign In with Facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  loginTitle: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
 
  spotify: {
    backgroundColor: '#54E176',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    borderRadius: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#131624',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    borderColor: '#C0C0C0',
    width: 300,
    borderWidth: 0.8,
    marginVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    
  },

  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign:'center',
    flex: 1,
    fontSize:16
  },
 /*  buttonTextSpotify:{
    
    fontWeight: '500',
    textAlign:'center',
    flex: 1,
    fontSize:16
  } */

     /*  signIn:{
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
    flex: 1,
    fontSize:16
  },
 */
});
