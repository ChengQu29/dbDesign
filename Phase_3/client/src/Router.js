import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import EmailForm from "./components/EmailForm";
import PostalCodeForm from "./components/PostalCodeForm";
import PhoneNumberForm from "./components/PhoneNumberForm";
import HouseholdForm from "./components/HouseholdForm";
import BathroomList from "./components/BathroomList";
import BathroomForm from "./components/BathroomForm";
import ReportOverview from "./components/ReportOverview";
import ReportManuModelSrch from "./components/ReportManuModelSrch";
import ReportLaundryCnt from "./components/ReportLaundryCnt";

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
    },
    {
        path: "/reports",
        element: <ReportOverview />,
    },
    {
        path: "/reports/ManuModelSearch",
        element: <ReportManuModelSrch />,
    },
    {
        path: "/reports/laundryCenter",
        element: <ReportLaundryCnt />,
    }
]);

export default router;