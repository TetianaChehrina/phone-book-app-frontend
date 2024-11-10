import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://phone-book-app-mvxa.onrender.com";
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (query = { isFavourite: false, type: "All" }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const { name, number } = state.filters;
      const requestParams = {
        type: query.type,
        isFavourite: query.favourite,
        name: name || "",
        number: number || "",
      };

      const response = await axios.get("/contacts", {
        params: requestParams,
      });

      return response.data;
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      console.error("Error adding contact:", error);

      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting contact:", error);
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (updatedContact, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (token) {
        setAuthHeader(token);
      }

      const response = await axios.patch(
        `/contacts/${updatedContact._id}`,
        updatedContact
      );
      return response.data;
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
