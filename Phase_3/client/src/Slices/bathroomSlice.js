import { createSlice } from "@reduxjs/toolkit";

export const bathroomSlice = createSlice({
    name: 'bathrooms',
    initialState: {
        bathrooms: [],
    },
    reducers: {
        addBathroom: (state, action) => {
            state.bathrooms = state.bathrooms.concat(action.payload);
        },
    }
});

export const { addBathroom } = bathroomSlice.actions;
export default bathroomSlice.reducer