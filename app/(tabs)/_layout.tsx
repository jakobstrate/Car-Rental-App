import { Tabs } from "expo-router";

export default function RootLayout() {
    return <Tabs screenOptions={{
            headerShown: false,
        }}>
        <Tabs.Screen
            name="Discover"
            options={{
                title: "Discover",
            }}
        />
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
            }}
        />
        <Tabs.Screen
            name="MyRentals"
            options={{
                title: "My Rentals",
            }}
        />

    </Tabs>
}
