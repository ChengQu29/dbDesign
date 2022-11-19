import { createSlice } from "@reduxjs/toolkit";

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