import { Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { submitApplianceForm, resetAppliance } from "../Slices/applianceSlice";
import { resetBathroom } from "../Slices/bathroomSlice";
import { resetHousehold } from "../Slices/householdSlice";

const ApplianceList = () => {
    const navigate = useNavigate();
    const appliances = useSelector(state => state.appliance.appliances);
    const email = useSelector(state => state.household.email);
    const dispatch = useDispatch();

    const handleSubmit = async form => {
        // TODO: use the `appliances` variable and the `email` variable to submit all appliances to the middleware
        try {
            const fulfilledAction = await dispatch(submitApplianceForm({email, appliances}));
            console.log(fulfilledAction);
        } catch(error) {
            return { email: "Something is wrong" };
        }
        console.log("Success");
        console.log(email);
        console.log(appliances);
        dispatch(resetAppliance());
        dispatch(resetBathroom());
        dispatch(resetHousehold());
        navigate("/succeed");
    };

    return (
        <Row>
            <h3>Appliances</h3>
            <p>You have added the following appliances to your household:</p>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Appliance #</th>
                        <th>Type</th>
                        <th>Manufacture</th>
                        <th>Model</th>
                    </tr>
                </thead>
                <tbody>
                    {appliances.map((appliance, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{appliance.applianceType}</td>
                                <td>{appliance.manufacturer}</td>
                                <td>{appliance.modelName? appliance.modelName : null}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Link to="/appliance/form">+ Add another appliance</Link>
            <Button variant="primary" onClick={handleSubmit} disabled={appliances.length === 0}>
                Next
            </Button>
        </Row>
    );
}

export default ApplianceList;