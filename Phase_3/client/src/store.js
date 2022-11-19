import { configureStore } from "@reduxjs/toolkit";
import householdSlice from "./Slices/householdSlice";
import bathroomSlice from "./Slices/bathroomSlice";
import applianceSlice from "./Slices/applianceSlice";

export default configureStore({
    reducer: {
        household: householdSlice,
        bathrooms: bathroomSlice,
        appliance: applianceSlice,
    },
});