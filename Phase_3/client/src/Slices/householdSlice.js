import { createSlice } from "@reduxjs/toolkit";

export const householdSlice = createSlice({
    name: 'household',
    initialState: {
        email: null,
        postalCode: null,
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
        }
    }
});

export const { updateEmail, updatePostalCode, updatePhoneNumber, updateHousehold } = householdSlice.actions;
export default householdSlice.reducer