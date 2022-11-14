import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import EmailForm from "./components/EmailForm";
import PostalCodeForm from "./components/PostalCodeForm";
import PhoneNumberForm from "./components/PhoneNumberForm";
import HouseholdForm from "./components/HouseholdForm";
import BathroomList from "./components/BathroomList";
import BathroomForm from "./components/BathroomForm";

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