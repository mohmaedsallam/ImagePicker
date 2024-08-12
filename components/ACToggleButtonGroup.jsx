import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../redux/slice";

const ACToggleButtonGroup = ({ label, field, options }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.userChoices[field]);

  const handlePress = (option) => {
    dispatch(setField({ field, value: option }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonGroup}>
        {options.map((option, index) => (
          <Pressable
            key={index}
            style={[
              styles.button,
              value === option && styles.selectedButton,
              index === 0 && styles.firstButton,
              index === options.length - 1 && styles.lastButton,
            ]}
            onPress={() => handlePress(option)}
          >
            <Text
              style={[
                styles.buttonText,
                value === option && styles.selectedButtonText,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
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
  buttonGroup: {
    flexDirection: "row",
  },
  button: {
    // flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    // marginHorizontal: 2,
  },
  selectedButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  firstButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "normal",
  },
});

export default ACToggleButtonGroup;
