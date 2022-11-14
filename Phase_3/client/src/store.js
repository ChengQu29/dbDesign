import { configureStore } from "@reduxjs/toolkit";
import householdSlice from "./Slices/householdSlice";
import bathroomSlice from "./Slices/bathroomSlice";

export default configureStore({
    reducer: {
        household: householdSlice,
        bathrooms: bathroomSlice,
    },
});