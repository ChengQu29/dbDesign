import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateEmail, fetchEmail } from "../Slices/householdSlice";

const EmailForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async form => {
        try {
            const fulfilledAction = await dispatch(fetchEmail(form.email));
            if(fulfilledAction.payload.existed) {
                return { email: "Email already exists" };
            }
        } catch(error) {
            return { email: "Something is wrong" };
        }
        console.log("Email form content:", form);
        dispatch(updateEmail({ email: form.email }));
        navigate("/household/postalCode");
    };
    const validateForm = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else {
            const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
            if (!values.email.match(emailPattern)) {
                errors.email = 'Email format is incorrect';
            }
        }
        return errors;
    };
    return (
        <Row>
            <h3>Enter household info</h3>
            <ReactFinalForm onSubmit={onSubmit} validate={validateForm}>
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <Field name="email">
                            {({input, meta}) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Please enter your email address:</Form.Label>
                                    <Form.Control placeholder="george.burdell@ramblinwreck.com" {...input} />
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

export default EmailForm;