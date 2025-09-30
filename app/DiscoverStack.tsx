import DiscoverScreen from "@/app/Discover";
import CarDetailsScreen from "@/app/CarDetails";
import { RootStackParamList } from "@/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen}  />
    </Stack.Navigator>
  );
}
