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
import Top25Manufacturers from "./components/Top25Manufacturers"
import AverageTVdisplaysizebystate from "./components/AverageTVdisplaysizebystate";
import ExtraFridgeFreezerReport from "./components/ExtraFridgeFreezerReport";
import BathroomStatistics from "./components/BathroomStatistics";
import SucceedPage from "./components/SucceedPage";
import ApplianceList from "./components/ApplianceList";
import ApplianceForm from "./components/ApplianceForm";

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
    },
    {
        path: "/reports/top25manufacturers",
        element: <Top25Manufacturers />,
    },    
	{
        path: "/reports/AverageTVdisplaysizebystate",
        element: <AverageTVdisplaysizebystate />,
    },	
	{
        path: "/reports/ExtraFridgeFreezerReport",
        element: <ExtraFridgeFreezerReport />,
    },	
	{
        path: "/reports/BathroomStatistics",
        element: <BathroomStatistics />,
    },
    {
        path: "/succeed",
        element: <SucceedPage />,
    },
    {
        path: "/appliances",
        element: <ApplianceList />,
    },
    {
        path: "/appliance/form",
        element: <ApplianceForm />,
    },
]);

export default router;