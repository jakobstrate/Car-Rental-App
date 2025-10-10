import BackIcon from "@/assets/images/icons/BackIcon.svg";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress: ((event: GestureResponderEvent) => void);
};



export default function BackBtn({style, onPress} : Props)  {
  return (
    <TouchableOpacity style={styles.backBtn} onPress={onPress}>
        <BackIcon style={styles.backIcon} width={42} height={42} />
        <Text style={styles.backTxt}>BACK</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    backBtn: {
        backgroundColor: '#007FFF',
        borderRadius: 100,
        height: 40,
        width: 80,
        alignItems: 'center',
        flexDirection: 'row',
    },
    backIcon: {
       
    },
    backTxt: {
        color: '#ffffffff',
        fontWeight: 'bold',
        right: 15,
        bottom: 1,
    }
});