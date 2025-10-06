import CalendarIcon from "@/assets/images/icons/CalendarIcon.svg";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (start: Date | undefined, end: Date | undefined) => void;
};


export default function DateRangePicker({ startDate, endDate, onChange } : Props)  {
  const [show, setShow] = React.useState(false);
  const [selectingStart, setSelectingStart] = React.useState(true);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {

    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    if (event.type === "set" && selectedDate) {
      if (selectingStart) {
        onChange(selectedDate, endDate);
        setSelectingStart(false);
        // had to delay showing so that the picker repoens after selecting start date,
        //  this seemed to be due to date time picker taking time to unmount/remount
        setShow(false);
        setTimeout(() => setShow(true), 0);  
      } else {
        if (startDate && selectedDate < startDate) {
          alert("End date cannot be before start date");
          return;
        }
        onChange(startDate, selectedDate);
        setSelectingStart(true);
        setShow(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Date
      </Text>
      <TouchableOpacity style={styles.datePickerBtn}
      onPress={() => {
          setSelectingStart(true);
          setShow(true);
        }}>
        <Text style={styles.datePickerBtnText}>
            {startDate
            ? `${startDate.toLocaleDateString("en-GB")}`
            : "---"}
        </Text>
        <Text style={styles.datePickerBtnText}>
            To
        </Text>
        <Text style={styles.datePickerBtnText}>
            {endDate
            ? `${endDate.toLocaleDateString("en-GB")}`
            : "---"}
        </Text>
        <CalendarIcon width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.trailingTxt}>
        DD/MM/YYYY
      </Text>
      


      {show && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={"default"}
          minimumDate={!selectingStart ? startDate || undefined : undefined}
          onChange={handleChange}
          
        />
      )}
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
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#269accff',
    marginBottom:20,
  
  },
  datePickerBtn: {
    height: '80%',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    
  },
  datePickerBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 5,
    top: 2,
    color: '#269accff',
  },
  trailingTxt: {
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'flex-start',
    left: 15,
    
  }
});
