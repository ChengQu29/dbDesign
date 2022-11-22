import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitBathroomForm = createAsyncThunk('household/submit', async (payload) => {
    const response = await axios.post(`http://127.0.0.1:5000/bathroom_submission`, payload)
    return response.data;
});


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