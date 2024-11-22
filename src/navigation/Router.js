import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SongInfoScreen from '../screens/SongInfoScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SongsScreen from '../screens/SongsScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#131624',
          shadowRadius: 2,
          shadowOffset: {width: 0, height: -10},
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 85,
          borderWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: 'white', fontSize: 14, fontWeight: '500'},
          tabBarIcon:({focused})=>
            focused ? (
              <Entypo name="home" color="white" size={24} />
            ) : (
              <AntDesign name="home" color="white" size={21} />
            ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarLabelStyle: {color: 'white', fontSize: 14, fontWeight: '500'},
        tabBarIcon:({focused})=>
          focused ? (
            <Ionicons name="person" color="white" size={24} />
          ) : (
            <Ionicons name="person-outline" color="white" size={21} />
          ),
      }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        /* initialRouteName="Main"  */
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Info" component={SongInfoScreen} />
        <Stack.Screen name="Songs" component={SongsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
