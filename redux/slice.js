import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unitSize: "",
  bedrooms: 0,
  bathrooms: 0,
  guestRooms: 0,
  lounges: 0,
  furnished: false,
  kitchen: "closed",
  parking: "split",
  electricityMeter: "",
  waterMeter: "",
  acType: "split",
  photos: [],
};

const userChoicesSlice = createSlice({
  name: "userChoices",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter((photo) => photo !== action.payload);
    },
  },
});

export const { setField, addPhoto, removePhoto } = userChoicesSlice.actions;

export default userChoicesSlice.reducer;
