import { createBrowserRouter } from "react-router-dom";
import App from "./Components/App";
import EmailForm from "./Components/EmailForm";
import PostalCodeForm from "./Components/PostalCodeForm";
import PhoneNumberForm from "./Components/PhoneNumberForm";
import HouseholdForm from "./Components/HouseholdForm";
import BathroomList from "./Components/BathroomList";
import BathroomForm from "./Components/BathroomForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/household/email",
        element: <EmailForm />,
    },
    {
        path: "/household/postalCode",
        element: <PostalCodeForm />,
    },
    {
        path: "/household/phoneNumber",
        element: <PhoneNumberForm />,
    },
    {
        path: "/household/household",
        element: <HouseholdForm />,
    },
    {
        path: "/bathrooms",
        element: <BathroomList />,
    },
    {
        path: "/bathroom/form",
        element: <BathroomForm />,
    }
]);

export default router;