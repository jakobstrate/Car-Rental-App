import FuelTypeIcon from "@/assets/images/icons/FuelTypeIcon.svg";
import MileageIcon from "@/assets/images/icons/MileageIcon.svg";
import TransmissionTypeIcon from "@/assets/images/icons/TransmissionIcon.svg";
import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

type Props = {
  style?: StyleProp<ViewStyle>;
  fuelType: string;
  transmission: string;
  mileage: string;
};

type CarInfoCard = {
    Icon: React.FC<SvgProps>;
    typeTxt: string;
    valueTxt: string;
};

const BasicCarInfoCard: React.FC<CarInfoCard> = ({ Icon, typeTxt, valueTxt}) => (
    <LinearGradient colors={['#007FFF', '#2A52BE']} style={basicCarInfoCardStyle.container}>
        <Icon  fill="#ffffffff" strokeWidth={1.5} width={32} height={32} />
        <Text style={basicCarInfoCardStyle.typeTxt}>{typeTxt}</Text>
        <Text style={basicCarInfoCardStyle.valueTxt}>{valueTxt.toUpperCase()}</Text>
    </LinearGradient>
);

export default function BasicCarInfoCards({fuelType, transmission, mileage, style} : Props)  {
  return (
    <View style={[styles.basicCarInfoCards,style]}>
        <BasicCarInfoCard Icon={FuelTypeIcon} typeTxt='FuelType' valueTxt={fuelType} />
        <BasicCarInfoCard Icon={TransmissionTypeIcon} typeTxt='Transmission' valueTxt={transmission} />
        <BasicCarInfoCard Icon={MileageIcon} typeTxt='Mileage' valueTxt={mileage} />
    </View>
  );
};

const styles = StyleSheet.create({
  basicCarInfoCards: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
    },
});

export const basicCarInfoCardStyle = StyleSheet.create({

    container: {
        height: 100,
        width: 100,
        borderRadius: 15,
        paddingLeft: 8,
        paddingTop: 8,
        boxShadow: "0 -2px 0px #369AFF, 0 3px 2px rgba(0,0,0,0.25)",
        elevation: 5,
    },
    typeTxt: {
        fontSize: 14,
        color: '#ffffffff',
        fontFamily: 'inter'
    },
    valueTxt: {
        fontSize: 14,
        fontWeight: '800',
        color: '#ffffffff',
    },
    icon: {
        
    }
});