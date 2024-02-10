import Profile from '@lm/screens/profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackNavigators from './homeStackNavigator';

const {Navigator, Screen} = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      <Navigator
        initialRouteName="TabHome"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Screen name="TabHome" component={HomeStackNavigators} />
        <Screen name="TabProfile" component={Profile} />
      </Navigator>
    </NavigationContainer>
  );
}
