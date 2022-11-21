import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRadisuReport = createAsyncThunk('household/fetchRadiusReport', async (payload) => {
    console.log(payload)
    const response = await axios.get(`http://127.0.0.1:5000/reports/radiusReport/${payload.lon}/${payload.lat}/${payload.radius}`)
    return response.data;
});

export const radiusReportSlice = createSlice({
    name: 'radiusReport',
    initialState: {
        radius: null,
        lon: null,
        lat: null,
    },
    reducers: {
        updateRadiusReport: (state, action) => {
            state.radius = action.payload.radius;
            state.lon = action.payload.lon;
            state.lat = action.payload.lat
        }
    }
});

export const { updateRadiusReport } = radiusReportSlice.actions;
export default radiusReportSlice.reducer