import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";

const SubmitButton = () => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log("Form submitted!");
    // You can dispatch any actions or handle form submission logic here
  };

  return (
    <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.controlButtonText}>Submit</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  controlButtonText: {
    textAlign: "center",
    color: "white",
  },
});

export default SubmitButton;
