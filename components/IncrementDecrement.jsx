import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../redux/slice";

const IncrementDecrement = ({ label, field }) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.userChoices[field]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.controlGroup}>
        <Pressable
          style={styles.controlButton}
          onPress={() =>
            dispatch(setField({ field, value: Math.max(0, value - 1) }))
          }
        >
          <Text style={styles.controlButtonText}>-</Text>
        </Pressable>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Pressable
          style={styles.controlButton}
          onPress={() => dispatch(setField({ field, value: value + 1 }))}
        >
          <Text style={styles.controlButtonText}>+</Text>
        </Pressable>
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
  controlGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  controlButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    alignItems: "center",
    width: 40,
  },
  controlButtonText: {
    fontSize: 20,
    color: "#333",
  },
  valueContainer: {
    flex: 1,
    alignItems: "center",
  },
  value: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
});

export default IncrementDecrement;
