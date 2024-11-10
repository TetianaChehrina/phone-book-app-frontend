import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    number: "",
    contactType: "",
    isFavourite: null,
  },
  reducers: {
    setStatusFilter(state, action) {
      const { name, number } = action.payload;
      state.name = name || "";
      state.number = number || "";
    },
    setContactTypeFilter(state, action) {
      state.contactType = action.payload;
      state.isFavourite = null;
    },
    setIsFavouriteFilter(state, action) {
      state.isFavourite =
        action.payload !== undefined
          ? action.payload
          : !state.isFavourite
          ? true
          : null;
    },
  },
});
export const { setStatusFilter, setContactTypeFilter, setIsFavouriteFilter } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
