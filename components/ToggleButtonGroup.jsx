import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../redux/slice";

const ToggleButtonGroup = ({ label, field, options }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.userChoices[field]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonGroup}>
        {options.map((option) => (
          <Pressable
            key={option}
            style={[styles.button, value === option && styles.selectedButton]}
            onPress={() => dispatch(setField({ field, value: option }))}
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
    width: "48%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#8d8d8d",
  },
  buttonGroup: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: "#fff",
  },
});

export default ToggleButtonGroup;
