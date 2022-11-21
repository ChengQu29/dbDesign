import { configureStore } from "@reduxjs/toolkit";
import householdSlice from "./Slices/householdSlice";
import bathroomSlice from "./Slices/bathroomSlice";
import applianceSlice from "./Slices/applianceSlice";
import radiusSlice from "./Slices/radiusSlice";

export default configureStore({
    reducer: {
        household: householdSlice,
        bathrooms: bathroomSlice,
        appliance: applianceSlice,
        radius: radiusSlice,
    },
});