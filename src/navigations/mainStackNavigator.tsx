import HomePage from '@lm/screens/Home';
// screens
import CategoryPage from '@lm/screens/Category';
import {NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Category: {
    categoryId: number | string;
    idType?: string;
  };
};
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function MainStackNavigators() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Category"
        component={CategoryPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
