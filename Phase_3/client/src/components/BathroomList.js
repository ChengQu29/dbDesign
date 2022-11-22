import { Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { submitBathroomForm } from "../Slices/bathroomSlice";

const BathroomList = () => {
    const navigate = useNavigate();
    const bathrooms = useSelector(state => state.bathrooms.bathrooms);
    const email = useSelector(state => state.household.email);
    const dispatch = useDispatch();

    const handleSubmit = async form => {
        // TODO: use the `bathrooms` variable and submit all bathrooms to the middleware
        try {
            const fulfilledAction = await dispatch(submitBathroomForm({email, bathrooms}));
            console.log(fulfilledAction);
        } catch(error) {
            return { email: "Something is wrong" };
        }
        console.log("Bathroom submission success, email", email);
        console.log("Bathroom submission success, bathrooms", bathrooms);
        navigate("/appliances");
    };

    return (
        <Row>
            <h3>Bathrooms</h3>
            <p>You have added the following bathrooms to your household:</p>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Bathroom #</th>
                        <th>Type</th>
                        <th>Primary</th>
                    </tr>
                </thead>
                <tbody>
                    {bathrooms.map((bathroom, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{bathroom.bathroomType}</td>
                                <td>{bathroom.isPrimary? "Yes" : null}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Link to="/bathroom/form">+ Add another bathroom</Link>
            <Button variant="primary" onClick={handleSubmit}>
                Next
            </Button>
        </Row>
    );
}

export default BathroomList;