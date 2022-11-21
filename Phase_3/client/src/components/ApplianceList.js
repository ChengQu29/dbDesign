import { Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ApplianceList = () => {
    const navigate = useNavigate();
    const appliances = useSelector(state => state.appliance.appliances);
    const email = useSelector(state => state.household.email);
    console.log(appliances);

    const handleSubmit = async form => {
        // TODO: use the `appliances` variable and the `email` variable to submit all appliances to the middleware
        console.log("Success");
        console.log(email);
        console.log(appliances);
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
            <Button variant="primary" onClick={handleSubmit}>
                Next
            </Button>
        </Row>
    );
}

export default ApplianceList;