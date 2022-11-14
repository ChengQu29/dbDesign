import { useState } from "react";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePostalCode } from "../Slices/householdSlice";

// TODO: Remove fake remote postal code validation promise
const fakeRemoteValidationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([{ city: "Atlanta", state: "GA" },]);
    }, 300);
});

const PostalCodeForm = () => {
    const [postalCodeInformation, setPostalCodeInformation] = useState([]);
    const postalCodeState = useSelector(state => state.household.postalCode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async form => {
        // TODO: Remove fake postal code validation
        try {
            const postalCode = await fakeRemoteValidationPromise;
            if(postalCode.length === 0) {
                return { postalCode: "Postal Code cannot be found" };
            }
            dispatch(updatePostalCode({ postalCode: form.postalCode }));
            setPostalCodeInformation(postalCode);
        } catch(error) {
            return { postalCode: "Something is wrong" };
        }

    };
    const handleConfirm = async () => {
        try {
            console.log("Success");
            console.log(`Form content ${ postalCodeState }`);
            navigate("/household/phoneNumber");
        } catch (error) {
            console.log("Something is wrong");
        }
    };
    const handleCancelConfirm = () => {
        setPostalCodeInformation([]);
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
            {postalCodeInformation.length === 0 ?
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </ReactFinalForm>
            :
            <>
                <Row className="text-center">
                    <p>You entered the following postal code:</p>
                    <p><b>{postalCodeState}</b></p>
                    <p>{postalCodeInformation[0].city}, {postalCodeInformation[0].state}</p>
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