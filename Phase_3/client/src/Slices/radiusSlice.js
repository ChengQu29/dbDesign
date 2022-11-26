import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRadisuReport = createAsyncThunk('household/fetchRadiusReport', async (payload) => {
    console.log(payload)
    const response = await axios.get(`http://127.0.0.1:5000/reports/radiusReport/${payload.lon}/${payload.lat}/${payload.radius}`)
    return response.data;
});

export const radiusSlice = createSlice({
    name: 'radius',
    initialState: {
        radius: null,
        postalCode: null
    },
    reducers: {
        updateRadius: (state, action) => {
            console.log("payload is: ", action.payload)
            state.radius = action.payload.radius;
            state.postalCode = action.payload.postalCode;
        }
    }
});

export const { updateRadius } = radiusSlice.actions;
export default radiusSlice.reducer