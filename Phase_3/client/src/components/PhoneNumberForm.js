import { useState } from "react";
import { ButtonGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePhoneNumber } from "../Slices/householdSlice";

// TODO: Remove fake remote email validation promise
const fakeRemoteValidationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([]);
    }, 300);
});

const PhoneNumberForm = () => {
    const dispatch = useDispatch();
    const [isShowPhoneForm, setIsShowPhoneForm] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async form => {
        // Strip number format

        // TODO: Remove fake remote phone validation
        try {
            const phone = await fakeRemoteValidationPromise;
            if(phone.length > 0) {
                return { areaCode: "Phone number and area code combination already exists", number: "Phone number and area code combination already exists" };
            }
        } catch(error) {
            return { areaCode: "Something is wrong", number: "Something is wrong" };
        }
        const processedNumber = form.number.replace("-", "");
        console.log("Success");
        console.log({...form, number: processedNumber, phoneType: form.phoneType ? form.phoneType : "Home"});
        dispatch(updatePhoneNumber({ areaCode: form.areaCode, number: processedNumber, phoneType: form.phoneType ? form.phoneType : "Home"}));
        navigate("/household/household");
    };
    const validateForm = values => {
        const errors = {};
        if (!values.areaCode) {
            errors.areaCode = 'Required';
        } else {
            const areaCodePattern = /^\d{3}$/;
            if (!values.areaCode.match(areaCodePattern)) {
                errors.areaCode = 'Area code format is incorrect';
            }
        }
        if (!values.number) {
            errors.number = 'Required';
        } else {
            const numberPattern = /^\d{3}-?\d{4}$/;
            if (!values.number.match(numberPattern)) {
                errors.number = 'Number format is incorrect';
            }
        }
        return errors;
    };
    return (
        <Row>
            <h3>Enter household info</h3>
            <p>Would you like to enter a phone number?  <ButtonGroup>
                <Button onClick={() => {setIsShowPhoneForm(true);}} variant={isShowPhoneForm? "primary" : "secondary"}>Yes</Button>
                <Button onClick={() => {setIsShowPhoneForm(false);}} variant={isShowPhoneForm? "secondary" : "primary"}>No</Button>
            </ButtonGroup></p>
            {isShowPhoneForm?
                <ReactFinalForm onSubmit={onSubmit} validate={validateForm}>
                    {props => (
                        <Form onSubmit={props.handleSubmit}>
                            <Field name="areaCode">
                                {({input, meta}) => (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Area code:</Form.Label>
                                        <Form.Control placeholder="404" {...input} />
                                        {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                    </Form.Group>
                                )}
                            </Field>
                            <Field name="number">
                                {({input, meta}) => (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Number:</Form.Label>
                                        <Form.Control placeholder="555-1212" {...input} />
                                        {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                    </Form.Group>
                                )}
                            </Field>
                            <Field name="phoneType">
                                {({input, meta}) => (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Type:</Form.Label>
                                        <Form.Select aria-label="Phone Type:" {...input}>
                                            <option value="home">Home</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="work">Work</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
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
                : <Button onClick={() => {navigate("/")}} variant="primary">Next</Button>
            }
        </Row>
    );
}

export default PhoneNumberForm;