import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostalCode = createAsyncThunk('household/fetchPostalCode', async (payload) => {
    console.log(payload)
    const response = await axios.get(`http://127.0.0.1:5000/postal_code/${payload}`)
    return response.data;
});

export const fetchEmail = createAsyncThunk('household/fetchEmail', async (email) => {
    const response = await axios.get(`http://127.0.0.1:5000/household/${email}`)
    return response.data;
});

export const fetchPhoneNumber = createAsyncThunk('household/fetchPhoneNumber', async (payload) => {
    const response = await axios.get(`http://127.0.0.1:5000/phone_number/${payload.areaCode}/${payload.number}`)
    return response.data;
});

export const submitHouseHoldForm = createAsyncThunk('household/submit', async (payload) => {
    console.log(payload)
    const formPayload = {
        email: payload.email,
        square_footage: payload.squareFootage,
        occupant: payload.occupants,
        bedroom: payload.bedrooms,
        home_type: payload.homeType,
        postal_code: payload.postalCode,
        area_code: payload.areaCode,
        number: payload.number,
        phone_type: payload.phoneType,
    };
    console.log(formPayload);
    const response = await axios.post(`http://127.0.0.1:5000/household_submission`, formPayload)
    return response.data;
});

export const householdSlice = createSlice({
    name: 'household',
    initialState: {
        email: null,
        postalCode: null,
        postalCodeInformation: null,
        areaCode: null,
        number: null,
        phoneType: null,
        homeType: null,
        squareFootage: null,
        occupants: null,
        bedrooms: null,
    },
    reducers: {
        updateEmail: (state, action) => {
            state.email = action.payload.email;
        },
        updatePostalCode: (state, action) => {
            state.postalCode = action.payload.postalCode;
        },
        updatePhoneNumber: (state, action) => {
            state.areaCode = action.payload.areaCode;
            state.number = action.payload.number;
            state.phoneType = action.payload.phoneType;
        },
        updateHousehold: (state, action) => {
            state.homeType = action.payload.homeType;
            state.squareFootage = action.payload.squareFootage;
            state.occupants = action.payload.occupants;
            state.bedrooms = action.payload.bedrooms;
        },
        resetHousehold: (state, action) => {
            state.email = null;
            state.postalCode = null;
            state.areaCode = null;
            state.number = null;
            state.phoneType = null;
            state.homeType = null;
            state.squareFootage = null;
            state.occupants = null;
            state.bedrooms = null;
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchPostalCode.fulfilled, (state, action) => {
              state.postalCodeInformation = action.payload.result;
          })
    }
});


export const { updateEmail, updatePostalCode, updatePhoneNumber, updateHousehold, resetHousehold } = householdSlice.actions;
export default householdSlice.reducer