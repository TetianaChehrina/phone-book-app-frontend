import { createSlice } from "@reduxjs/toolkit";

import { createSelector } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "./operations";
import { selectContacts } from "./selectors";
import {
  selectContactTypeFilter,
  selectIsFavouriteFilter,
  selectNameFilter,
  selectNumberFilter,
} from "../filters/selectors";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    favourites: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addContact.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.meta.arg
        );
        state.isLoading = false;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteContact.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectFilteredContacts = createSelector(
  [
    selectContacts,
    selectNameFilter,
    selectNumberFilter,
    selectContactTypeFilter,
    selectIsFavouriteFilter,
  ],
  (contacts, name, number, contactType, isFavourite) => {
    if (!contacts || !Array.isArray(contacts)) return [];

    return contacts.filter((contact) => {
      const contactName = contact.name ? contact.name.toLowerCase() : "";
      const contactNumber = contact.phoneNumber ? contact.phoneNumber : "";

      return (
        (contactName.includes(name.toLowerCase()) ||
          contactNumber.includes(number)) &&
        (contactType ? contact.contactType === contactType : true) &&
        (!isFavourite || contact.isFavourite)
      );
    });
  }
);

export const contactsReducer = contactsSlice.reducer;
