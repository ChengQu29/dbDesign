import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateHousehold } from "../Slices/householdSlice";

const HouseholdForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async form => {
        // TODO: We will submit the household information together here
        console.log("Success");
        console.log({...form,  homeType: form.homeType ? form.homeType : "House"});
        dispatch(updateHousehold({ ...form, homeType: form.homeType ? form.homeType : "House"}));
        navigate("/bathrooms");
    };
    const validateForm = values => {
        const errors = {};
        if (!values.squareFootage) {
            errors.squareFootage = 'Required';
        } else {
            const squareFootagePattern = /^\d+$/;
            if (!values.squareFootage.match(squareFootagePattern)) {
                errors.squareFootage = 'Square format is incorrect';
            }
        }
        if (!values.occupants) {
            errors.occupants = 'Required';
        } else {
            const occupantsPattern = /^\d+$/;
            if (!values.occupants.match(occupantsPattern)) {
                errors.occupants = 'Occupants format is incorrect';
            }
        }
        if (!values.bedrooms) {
            errors.bedrooms = 'Required';
        } else {
            const bedroomsPattern = /^\d+$/;
            if (!values.bedrooms.match(bedroomsPattern)) {
                errors.bedrooms = 'Bedrooms format is incorrect';
            }
        }
        return errors;
    };
    return (
        <Row>
            <h3>Enter household info</h3>
            <p>Please enter the following details for your household.</p>
            <ReactFinalForm onSubmit={onSubmit} validate={validateForm}>
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <Field name="homeType">
                            {({input, meta}) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Home type:</Form.Label>
                                    <Form.Select {...input}>
                                        <option value="house">House</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="townhome">Townhome</option>
                                        <option value="condominium">Condominium</option>
                                        <option value="mobile home">Mobile home</option>
                                    </Form.Select>
                                    {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                </Form.Group>
                            )}
                        </Field>
                        <Field name="squareFootage">
                            {({input, meta}) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Square footage:</Form.Label>
                                    <Form.Control placeholder="2200" {...input} />
                                    {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                </Form.Group>
                            )}
                        </Field>
                        <Field name="occupants">
                            {({input, meta}) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Occupants:</Form.Label>
                                    <Form.Control placeholder="4" {...input} />
                                    {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                </Form.Group>
                            )}
                        </Field>
                        <Field name="bedrooms">
                            {({input, meta}) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Bedrooms:</Form.Label>
                                    <Form.Control placeholder="3" {...input} />
                                    {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                </Form.Group>
                            )}
                        </Field>
                        <Button variant="primary" type="submit">
                            Next
                        </Button>
                    </Form>
                )}
            </ReactFinalForm>
        </Row>
    );
}

export default HouseholdForm;