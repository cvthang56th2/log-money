import Profile from '@lm/screens/profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import HomeStackNavigators from './homeStackNavigator';

const {Navigator, Screen} = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      <Navigator
        initialRouteName="TabHome"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'house';

            if (route.name === 'TabProfile') {
              iconName = 'user';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Screen
          name="TabHome"
          component={HomeStackNavigators}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Screen
          name="TabProfile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
