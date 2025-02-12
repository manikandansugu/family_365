import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLOR} from '../../utils/colors';
import moment from 'moment';

const DatePickerComponent = ({
  onDateChange,
  open,
  setOpen,
  onCancel,
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<any>>;
  onDateChange: (date: string) => void;
  onCancel: () => void;
}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (selectedDate?.trim?.length === 0) {
      setOpen(false);
    }
  }, [selectedDate]);

  return (
    <>
      <Pressable style={styles.dateInput} onPress={() => setOpen(true)}>
        {selectedDate ? (
          <Text style={styles.dateText}>
            {moment(selectedDate).format('DD/MMM/YYYY')}
          </Text>
        ) : (
          <Text style={styles.dateText}>DD/MMM/YYYY</Text>
        )}
      </Pressable>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date: any) => {
          setOpen(false); // Close modal
          setDate(date);
          setSelectedDate(date); // Set the selected date
        }}
        onCancel={onCancel} // Ensure the modal closes on cancel
      />
    </>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
  dateInput: {
    height: 40,
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 12,
    color: COLOR.white,
  },
});
