import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { useUser } from "@/context/UserContext";
import { useNavigation } from "@react-navigation/native";
import TitleCard from "@/Components/TitleCard";
import GradientNavButton from "@/Components/GradientNavButton";
import { default_theme } from "@/styles/colors";
import ProfileIcon from '@/assets/images/icons/ProfileIcon.svg';
import { LinearGradient } from "expo-linear-gradient";
import { useCar } from "@/context/CarContext";
import { useEffect, useState } from "react";
import { Car } from "@/types/Car";
import { API } from "@/constants";
import CarDetails from "./CarDetails";

export default function Index() {
    const { user, logout } = useUser();

    const { cars, getRandomCar } = useCar();
    const [featuredCar, setFeaturedCar] = useState<Car | null>(null);


    const navigation = useNavigation();

    const handleLogout = async () => {
        logout()
    };

    useEffect(() => {
        const randomCar = getRandomCar();
        setFeaturedCar(randomCar);
    }, [cars]);

    return (
        <View style={styles.root}>
            <TitleCard />

            <View style={styles.buttonRowView}>

                <View style={styles.discoverView}>
                    <GradientNavButton
                        onPress={() => navigation.navigate("DiscoverStack")}
                        style={styles.defaultBackground}
                    >
                        <Image
                            source={require("@/assets/images/vwpolo.png")}
                            style={styles.discoverImg}
                        />
                        <Text style={styles.discoverText}>Discover</Text>
                    </GradientNavButton>
                </View>

                <View style={styles.profileView}>
                    <GradientNavButton
                        onPress={() => {
                            if (user) {
                                navigation.navigate("MyRentalsStack");
                            } else {
                                navigation.navigate("Login");
                            }
                        }}
                        style={styles.defaultBackground}
                    >
                        <ProfileIcon
                            width={48}
                            height={48}
                            stroke={default_theme.text}
                            strokeWidth={2}
                        />
                        {user && (

                            <Text style={styles.accountButtonText}>{user.fullName}</Text>
                        )}
                    </GradientNavButton>
                </View>

            </View>

            <View style={styles.featuredView}>
                <GradientNavButton
                    onPress={() => {
                        if (featuredCar) {
                            navigation.navigate("DiscoverStack", { screen: "CarDetails", params: { car: featuredCar } })
                        } else {
                            console.log(featuredCar);
                        }
                    }}
                    style={styles.defaultBackground}
                >
                    <View style={styles.featuredTextView}>
                        <Text style={styles.featuredText}>Featured</Text>
                    </View>

                    {featuredCar ? (
                        <View style={styles.featuredImgView}>
                            <ImageBackground
                                source={{ uri: `${API}/${featuredCar.image}` }}
                                style={styles.featuredImg}
                                imageStyle={{ borderRadius: 20, }}
                            >
                                <LinearGradient
                                    style={{ width: "100%", height: "100%", borderRadius: 20 }}
                                    colors={["#000000E6", "#00000000"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <View style={styles.detailsView}>
                                        <View>
                                            <Text style={styles.detailsHead}>{featuredCar.brand + " " + featuredCar.modelName}</Text>
                                            <Text style={styles.detailsBody}>{featuredCar?.description}</Text>
                                        </View>

                                        <Text style={styles.detailsPrice}>{featuredCar?.rentPerHour} dkk / Hour</Text>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        </View>
                    ) : (
                        <View style={styles.featuredImgView}>
                            <Image
                                style={styles.featuredImg}
                                source={require("@/assets/images/NoFeatured.png")}
                            >
                            </Image>
                        </View>

                    )}
                </GradientNavButton>
            </View >

            < View style={styles.loginView}>
                {!user ? (
                    <GradientNavButton
                        onPress={() => navigation.navigate("Login")}
                        style={styles.defaultBackground}
                    >
                        <Text style={styles.lrText}>Login</Text>
                    </GradientNavButton>
                ) : (
                    <GradientNavButton
                        onPress={() => handleLogout()}
                        style={styles.defaultBackground}
                    >
                        <Text style={styles.lrText}>Logout</Text>
                    </GradientNavButton>

                )}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 40,
        paddingHorizontal: 15,
    },

    buttonRowView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        height: "25%",
    },

    discoverView: {
        paddingVertical: 10,
        width: "60%",
    },

    discoverImg: {
        width: "100%",
        height: 120,
        resizeMode: "contain",
    },

    discoverText: {
        fontSize: 36,
        fontWeight: "800",
        color: default_theme.text,
        textAlign: "center",
    },

    profileView: {
        width: "35%",
        height: "60%",
    },

    accountButtonText: {
        fontSize: 16,
        fontWeight: "300",
        color: default_theme.text,
        textAlign: "center",
    },

    featuredView: {
        width: "100%",
        height: "25%",
    },

    featuredTextView: {
        alignItems: "flex-start",
        width: "100%",
        height: "25%",
        paddingLeft: 25,
        marginBottom: 5,
    },

    featuredText: {
        fontSize: 36,
        fontWeight: "600",
        color: default_theme.text,

        textShadowColor: "#00000080",
        textShadowRadius: 4,
        textShadowOffset: { width: -2, height: 2 },
    },

    featuredImgView: {
        width: "100%",
        height: "80%",
        paddingBottom: 10,
        paddingHorizontal: 5,
    },

    featuredImg: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    detailsView: {
        width: "60%",
        height: "100%",
        paddingLeft: 10,
        justifyContent: "space-between",
    },

    detailsHead: {
        color: default_theme.text,
        fontSize: 24,
        fontWeight: 600,
    },

    detailsBody: {
        color: default_theme.text,
        fontSize: 12,
        fontWeight: 300,
    },

    detailsPrice: {
        color: default_theme.text,
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 5,
    },

    loginView: {
        width: "80%",
        height: "8%",
    },

    lrText: {
        fontSize: 32,
        fontWeight: "500",
        color: default_theme.text,
        textAlign: "center",
    },

    defaultBackground: {
        padding: 5,
        height: "100%",
    },
});


