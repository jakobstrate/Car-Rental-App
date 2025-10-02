import { RootStackParamList } from "@/types/navigation";
import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;


interface UserContextType {
    user: User | null;
    loggedIn: boolean;
    login: (email: string, password: string, navigation?: RootStackNavigationProp) => void;
    logout: () => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const login = async (email: string, password: string, navigation?: RootStackNavigationProp) => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
            const users: User[] = JSON.parse(storedUsers);
            const foundUser = users.find(
                (u) => u.email === email && u.password === password
            );

            if (foundUser) {
                await AsyncStorage.setItem("currentUser", JSON.stringify(foundUser));
                setUser(foundUser);
                setLoggedIn(true);

                Alert.alert("Welcome",`Login successful, Welcome ${foundUser.fullName}`);

                if (navigation) {
                    navigation.pop(2);
                }
            } else {
                Alert.alert("Error", "Invalid credentials");
            }
        } else {
            Alert.alert("Error", "No accounts found, please register first.");
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem("currentUser");
        setUser(null);
        setLoggedIn(false);
    };

    const value = { user, loggedIn, login, logout };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};


export function useUser() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be called within a UserProvider");
    }

    return context;
}
