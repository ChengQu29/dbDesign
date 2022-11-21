import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostalCode } from "../Slices/householdSlice";
import { updateRadius } from "../Slices/radiusSlice";

const HouseHoldAvgByRadiusInputForm = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async form => {
        try {
            const fulfilledAction = await dispatch(fetchPostalCode(form.postalCode));
            if(fulfilledAction.payload.result === "postal code not found") {
                return { postalCode: "Postal Code cannot be found" };
            }
        } catch(error) {
            return { postalCode: "PostalCode Not Found" };
        }
        dispatch(updateRadius({ radius: form.radius }));
        navigate("/reports/HouseHoldAvgByRadiusReport");
    };

    const validateForm = values => {
        const errors = {};
        if (!values.postalCode) {
            errors.postalCode = 'Required';
        } else {
            const postalCodePattern = /^\d{5}$/;
            if (!values.postalCode.match(postalCodePattern)) {
                errors.postalCode = 'PostalCode format is incorrect';
            }
        }
        return errors;
    };

    return (
        <Row>
            <h3>Household Average Report By Radius</h3>
            
            <ReactFinalForm onSubmit={onSubmit} validate={validateForm}>
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <Field name="postalCode">
                            {({input, meta}) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Please enter your five digits postal code:</Form.Label>
                                    <Form.Control placeholder="40928" {...input} />
                                    {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                </Form.Group>
                            )}
                        </Field>
                        <Field name="radius">
                            {({input, meta}) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Please enter the search radius</Form.Label>
                                    <Form.Control placeholder="100" {...input} />
                                    {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                </Form.Group>
                            )}
                        </Field>

                        <Row>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Row>
                    </Form>
                )}
            </ReactFinalForm>
            
        </Row>
    );
}

export default HouseHoldAvgByRadiusInputForm;