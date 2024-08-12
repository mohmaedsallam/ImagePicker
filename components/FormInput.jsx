import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../redux/slice";

const FormInput = ({ label, field, placeholder }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.userChoices[field]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        cursorColor="#4CAF50"
        style={styles.input}
        value={value}
        onChangeText={(text) => dispatch(setField({ field, value: text }))}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#8d8d8d",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default FormInput;
