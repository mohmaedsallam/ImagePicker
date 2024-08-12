import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, removePhoto } from "../redux/slice";
import { Ionicons } from "@expo/vector-icons"; // For the recycle bin icon

const ImagePickerComponent = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.userChoices.photos);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        for (let asset of result.assets) {
          if (typeof asset.uri !== "string" || asset.uri.trim() === "") {
            throw new TypeError("The uri argument must be a non-empty string");
          }
          const manipulatedImage = await ImageManipulator.manipulateAsync(
            asset.uri,
            [{ resize: { width: 800 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
          );
          dispatch(addPhoto(manipulatedImage.uri));
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // const takePhoto = async () => {
  //   try {
  //     let result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       quality: 1,
  //       allowsEditing: true, // This enables basic editing in the native UI
  //     });

  //     if (!result.canceled && result.assets && result.assets.length > 0) {
  //       const asset = result.assets[0];
  //       if (typeof asset.uri !== "string" || asset.uri.trim() === "") {
  //         throw new TypeError("The uri argument must be a non-empty string");
  //       }
  //       const manipulatedImage = await ImageManipulator.manipulateAsync(
  //         asset.uri,
  //         [{ resize: { width: 800 } }],
  //         { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  //       );
  //       dispatch(addPhoto(manipulatedImage.uri));
  //     }
  //   } catch (error) {
  //     console.error("Error taking photo:", error);
  //   }
  // };
  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true, // This enables basic editing in the native UI
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (typeof asset.uri !== "string" || asset.uri.trim() === "") {
          throw new TypeError("The uri argument must be a non-empty string");
        }

        // First, allow the user to crop the image
        const croppedImage = await ImageManipulator.manipulateAsync(
          asset.uri,
          [
            {
              crop: {
                originX: 0,
                originY: 0,
                width: asset.width,
                height: asset.height,
              },
            },
          ],
          { format: ImageManipulator.SaveFormat.JPEG }
        );

        // Then, resize and compress the cropped image
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          croppedImage.uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        dispatch(addPhoto(manipulatedImage.uri));
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };
  const handleDelete = (uri) => {
    Alert.alert("Delete Photo", "Are you sure you want to delete this photo?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => dispatch(removePhoto(uri)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload Photo</Text>
      <Pressable style={styles.chooseButton} onPress={pickImage}>
        <Text style={styles.chooseButtonText}>
          Select a photo from your gallery
        </Text>
      </Pressable>
      <Pressable style={styles.chooseButton} onPress={takePhoto}>
        <Text style={styles.chooseButtonText}>Take Photo</Text>
      </Pressable>
      <FlatList
        data={photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDelete(item)}
            >
              <Ionicons name="trash-bin-outline" size={16} color="#fff" />
            </Pressable>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
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
  chooseButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  chooseButtonText: {
    color: "#4CAF50",
    fontSize: 16,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(76, 175, 80, 0.66)",
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
});

export default ImagePickerComponent;
