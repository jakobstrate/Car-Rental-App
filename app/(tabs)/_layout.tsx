//import { Tabs } from "expo-router";
import DiscoverStack from "@/app/DiscoverStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Index from "./index";
import MyRentals from "./MyRentals";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
        <Tab.Screen name="MyRentals" component={MyRentals} />
      </Tab.Navigator>
  );
}
