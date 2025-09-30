import MyRentalsScreen from "@/app/MyRentals";
import BookingDetailScreen from "@/app/BookingDetails";
import { RootStackParamList } from "@/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MyRentalsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyRentals" component={MyRentalsScreen} />
      <Stack.Screen name="BookingDetails" component={BookingDetailScreen}  />
    </Stack.Navigator>
  );
}
