import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import DiscoverStack from "./app/DiscoverStack";
import Index from "./app/Index";
import Login from './app/Login';
import MyRentalsStack from "./app/MyRentalsStack";
import Register from './app/Register';
import { BookingProvider } from './context/BookingContext';
import { UserProvider } from './context/UserContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#269accff'
  },
};

function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="DiscoverStack" component={DiscoverStack}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? "Discover";
                    return {
                        tabBarStyle: routeName === "CarDetails" ? { display: "none" } : undefined,
                    };
                }} />
            <Tab.Screen name="Home" component={Index} />
            <Tab.Screen name="MyRentalsStack" component={MyRentalsStack}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? "MyRentals";
                    return {
                        tabBarStyle: routeName === "BookingDetails" ? { display: "none" } : undefined,
                    };
                }} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <UserProvider>
            <BookingProvider>
                <NavigationContainer theme={MyTheme}>
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
