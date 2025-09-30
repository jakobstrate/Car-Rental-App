//import { Tabs } from "expo-router";
import DiscoverStack from "@/app/DiscoverStack";
import MyRentalsStack from "@/app/MyRentalsStack";
import { BookingProvider } from "@/context/BookingContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Index from "./index";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <BookingProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="DiscoverStack" component={DiscoverStack} options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Discover";
            return {
              tabBarStyle: routeName === "CarDetails" ? { display: "none" } : undefined,
            };
          }} />
        <Tab.Screen name="Home" component={Index} />
        <Tab.Screen name="MyRentalsStack" component={MyRentalsStack} options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "MyRentals";
            return {
              tabBarStyle: routeName === "BookingDetails" ? { display: "none" } : undefined,
            };
          }} />
      </Tab.Navigator>
    </BookingProvider>
  );
}
