import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  style?: StyleProp<ViewStyle>;
};


export default function DateRangeViewBar({ startDate, endDate, style} : Props)  {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>
        Date
      </Text>
      <View style={styles.dateRangeBarBody}>
        <Text style={styles.dateRangeBarText}>
            {startDate
            ? `${startDate.toLocaleDateString("en-GB")}`
            : "---"}
        </Text>
        <Text style={styles.dateRangeBarText}>
            To
        </Text>
        <Text style={styles.dateRangeBarText}>
            {endDate
            ? `${endDate.toLocaleDateString("en-GB")}`
            : "---"}
        </Text>
      </View>
      <Text style={styles.trailingTxt}>
        DD/MM/YYYY
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 50,
    width: '70%',
    justifyContent: 'center',
    borderColor: '#0093cbff',
    borderWidth: 2,
    borderRadius: 5,
    gap: 2,
  },
  dateRangeBarBody: {
    height: '80%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateRangeBarText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: '#0093cbff',
    left: 15,
    backgroundColor: '#ffffffff',
    paddingHorizontal: 5,
    top: 2,
  },
  trailingTxt: {
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'flex-start',
    left: 15,
    color: '#7e7e7eff',
  }
});
