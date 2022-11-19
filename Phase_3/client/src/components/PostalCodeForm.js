import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePostalCode, fetchPostalCode } from "../Slices/householdSlice";

const PostalCodeForm = () => {
    const postalCodeInformationState = useSelector(state => state.household.postalCodeInformation);
    const postalCodeState = useSelector(state => state.household.postalCode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async form => {
        try {
            const fulfilledAction = await dispatch(fetchPostalCode(form.postalCode));
            console.log("PostalCode form content:", form);
            if(fulfilledAction.payload.result === "postal code not found") {
                return { postalCode: "Postal Code cannot be found" };
            }
            dispatch(updatePostalCode({ postalCode: form.postalCode }));
        } catch(error) {
            return { postalCode: "Something is wrong" };
        }
    };

    const handleConfirm = async () => {
        navigate("/household/phoneNumber");
    };

    const handleCancelConfirm = () => {
        dispatch(updatePostalCode({ postalCode: null }));
    }

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
            <h3>Enter household info</h3>
            {!postalCodeState ?
            <ReactFinalForm onSubmit={onSubmit} validate={validateForm}>
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <Field name="postalCode">
                            {({input, meta}) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Please enter your five digits postal code:</Form.Label>
                                    <Form.Control placeholder="30332" {...input} />
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
            :
            <>
                <Row className="text-center">
                    <p>You entered the following postal code:</p>
                    <p><b>{postalCodeInformationState.postal_code}</b></p>
                    <p>{postalCodeInformationState.city}, {postalCodeInformationState.state}</p>
                    <br></br>
                    <p>Is this correct?</p>
                </Row>
                <Row className="d-grid gap-2">
                    <Button variant="primary" onClick={handleConfirm}>Yes</Button>
                    <Button variant="light" onClick={handleCancelConfirm}>No</Button>
                </Row>
            </>
            }
        </Row>
    );
}

export default PostalCodeForm;