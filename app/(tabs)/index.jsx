import React from "react";
import { StyleSheet, View, ScrollView, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/FormInput";
import IncrementDecrement from "../../components/IncrementDecrement";
import ToggleButtonGroup from "../../components/ToggleButtonGroup";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import ACToggleButtonGroup from "../../components/ACToggleButtonGroup"; // Import the new component

export default function HomeScreen() {
  const dispatch = useDispatch();
  const userChoices = useSelector((state) => state.userChoices);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.stepTitle}>Step 1 - Unit Details</Text>
        <Text style={styles.stepDescription}>
          Please enter the unit information below.
        </Text>

        <FormInput
          label="Unit Size"
          field="unitSize"
          placeholder="Enter Size"
        />

        <View style={styles.gridContainer}>
          <IncrementDecrement label="Bedrooms" field="bedrooms" />
          <IncrementDecrement label="Bathrooms" field="bathrooms" />
          <IncrementDecrement label="Guest Rooms" field="guestRooms" />
          <IncrementDecrement label="Lounges" field="lounges" />
        </View>

        <View style={styles.toggleContainer}>
          <ToggleButtonGroup
            label="Furnished"
            field="furnished"
            options={["Yes", "No"]}
          />
          <ToggleButtonGroup
            label="Kitchen"
            field="kitchen"
            options={["Closed", "Open"]}
          />
        </View>
        <View style={styles.toggleContainer}>
          <ToggleButtonGroup
            label="Parking"
            field="parking"
            options={["Split", "Central"]}
          />
        </View>

        <FormInput
          label="Electricity Meter No."
          field="electricityMeter"
          placeholder="Enter meter no"
        />
        <FormInput
          label="Water Meter No."
          field="waterMeter"
          placeholder="Enter meter no"
        />

        <ACToggleButtonGroup
          label="Select AC Type"
          field="acType"
          options={["Split", "Central", "Window", "Not Installed"]}
        />

        <ImagePickerComponent />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.backButton}>
          <Text style={styles.buttonBackText}>Back</Text>
        </Pressable>
        <Pressable style={styles.nextButton}>
          <Text style={styles.buttonNextText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    marginTop: 10,
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  backButton: {
    backgroundColor: "#fff",
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "48%",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    width: "48%",
    alignItems: "center",
  },
  buttonBackText: {
    color: "#4CAF50",
    fontSize: 16,
  },
  buttonNextText: {
    color: "#fff",
    fontSize: 16,
  },
});
