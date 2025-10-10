import DiscoverIcon from '@/assets/images/icons/DiscoverIcon.svg';
import HomeIcon from '@/assets/images/icons/HomeIcon.svg';
import ProfileIcon from '@/assets/images/icons/ProfileIcon.svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import React from 'react';
import DiscoverStack from "./app/DiscoverStack";
import Index from "./app/Index";
import Login from './app/Login';
import MyRentalsStack from "./app/MyRentalsStack";
import Register from './app/Register';
import { BookingProvider } from './context/BookingContext';
import { UserProvider } from './context/UserContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


//nav bar bottom styling:
const tabIcons = {
  Home: HomeIcon,
  MyRentalsStack: ProfileIcon,
  DiscoverStack: DiscoverIcon,
};

function getTabBarStyle(route, hiddenRoutes = []) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  return hiddenRoutes.includes(routeName) ? { display: 'none' } : undefined;
}

function MainTabs() {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => {
          const Icon = tabIcons[route.name];
          return {
            headerShown: false,
            tabBarIcon: ({ focused, size }) => {
                const strokeWidth = focused ? 4 : 2;
                const strokeColor = focused ? '#000000ff' : '#aaa';
                return Icon ? <Icon width={size} height={size} stroke={strokeColor} fill="none" strokeWidth={strokeWidth} /> : null;
            },
              
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#ABABAB',
          };
        }}>
            <Tab.Screen name="DiscoverStack" component={DiscoverStack}
                options={({ route }) => ({
                    tabBarLabel: 'Discover',
                    tabBarStyle: getTabBarStyle(route, ['CarDetails']),
                })} 
            />
            <Tab.Screen name="Home" component={Index} />
            <Tab.Screen name="MyRentalsStack" component={MyRentalsStack}
                options={({ route }) => ({
                    tabBarLabel: 'MyRentals',
                    tabBarStyle: getTabBarStyle(route, ['BookingDetails']),
                })}/>
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <UserProvider>
            <BookingProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Main" component={MainTabs} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </Stack.Navigator>
                </NavigationContainer>
            </BookingProvider>
        </UserProvider>

    );
}

// Needed because we use non default name for entrypoint.
// And we fucked something up at some point.
registerRootComponent(App);
