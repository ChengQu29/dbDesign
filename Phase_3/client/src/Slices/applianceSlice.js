import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitApplianceForm = createAsyncThunk('householdappliance/submit', async (payload) => {
    const response = await axios.post(`http://127.0.0.1:5000/appliance_submission`, payload)
    return response.data;
})

export const applianceSlice = createSlice({
    name: 'appliance',
    initialState: {
        appliances: [],
    },
    reducers: {
        addAppliance: (state, action) => {
            state.appliances = state.appliances.concat(action.payload);
        },
    }
});

export const { addAppliance } = applianceSlice.actions;
export default applianceSlice.reducer