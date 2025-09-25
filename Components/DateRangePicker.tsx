import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React from "react";
import { Button, Platform, StyleSheet, View } from "react-native";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
};


export default function DateRangePicker({ startDate, endDate, onChange } : Props)  {
  const [show, setShow] = React.useState(false);
  const [selectingStart, setSelectingStart] = React.useState(true);

  const handleChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (!selectedDate) return;


    
    if (selectingStart) {
      onChange(selectedDate, endDate);
      setSelectingStart(false);
    } else {
      if (startDate && selectedDate < startDate) {
        alert("End date cannot be before start date");
        return;
      }
      onChange(startDate, selectedDate);
      setSelectingStart(true);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={startDate ? startDate.toDateString() : "Select Start Date"}
        onPress={() => {
          setSelectingStart(true);
          setShow(true);
        }}
      />

      <Button
        title={endDate ? endDate.toDateString() : "Select End Date"}
        onPress={() => {
          if (!startDate) {
            alert("Please select start date first");
            return;
          }
          setSelectingStart(false);
          setShow(true);
        }}
      />

      {show && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "inline"}
          minimumDate={!selectingStart ? startDate || undefined : undefined}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5, 
    alignItems: 'center',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    marginTop: 10,
  },
});
