import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBathroom } from "../Slices/bathroomSlice";

const BathroomForm = () => {
    const [key, setKey] = useState('half');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = bathroomType => async form => {
        console.log("Success");
        console.log(form);
        dispatch(addBathroom({...form, bathroomType}));
        navigate("/bathrooms");
    };
    const validateHalfForm = values => {
        const errors = {};
        if (!values.sink) {
            errors.sink = 'Required';
        } else {
            const sinkPattern = /^\d+$/;
            if (!values.sink.match(sinkPattern)) {
                errors.sink = 'Sink format is incorrect';
            }
        }
        if (!values.commode) {
            errors.commode = 'Required';
        } else {
            const commodePattern = /^\d+$/;
            if (!values.commode.match(commodePattern)) {
                errors.commode = 'Commode format is incorrect';
            }
        }
        if (!values.bidet) {
            errors.bidet = 'Required';
        } else {
            const bidetPattern = /^\d+$/;
            if (!values.bidet.match(bidetPattern)) {
                errors.bidet = 'Bidet format is incorrect';
            }
        }
        return errors;
    };
    const validateFullForm = values => {
        const errors = validateHalfForm(values);
        if (!values.bathtubs) {
            errors.bathtubs = 'Required';
        } else {
            const bathtubsPattern = /^\d+$/;
            if (!values.bathtubs.match(bathtubsPattern)) {
                errors.bathtubs = 'Bathtubs format is incorrect';
            }
        }
        if (!values.showers) {
            errors.showers = 'Required';
        } else {
            const showersPattern = /^\d+$/;
            if (!values.showers.match(showersPattern)) {
                errors.showers = 'Showers format is incorrect';
            }
        }
        if (!values.tubsShowers) {
            errors.tubsShowers = 'Required';
        } else {
            const tubsShowersPattern = /^\d+$/;
            if (!values.tubsShowers.match(tubsShowersPattern)) {
                errors.tubsShowers = 'Tubs/Showers format is incorrect';
            }
        }
    };
    return (
        <Row>
            <h3>Add bathroom</h3>
            <p>Please provide the details regarding the bathroom.</p>
            <p>Bathroom type:</p>
            <Tabs activeKey={key} onSelect={key => setKey(key)} className="mb-3">
                <Tab eventKey="half" title="half">
                    <ReactFinalForm onSubmit={onSubmit("half")} validate={validateHalfForm}>
                        {props => (
                            <Form onSubmit={props.handleSubmit}>
                            <Row>
                                <Field name="sink">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Sink:</Form.Label>
                                            <Form.Control placeholder="2" {...input} />
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>
                                <Field name="commode">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Commode:</Form.Label>
                                            <Form.Control placeholder="1" {...input} />
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>
                                <Field name="bidet">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Bidet:</Form.Label>
                                            <Form.Control placeholder="1" {...input} />
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                                </Row>
                            </Form>
                        )}
                    </ReactFinalForm>
                </Tab>
                <Tab eventKey="full" title="full">
                    <ReactFinalForm onSubmit={onSubmit("full")} validate={validateFullForm}>
                        {props => (
                            <Form onSubmit={props.handleSubmit}>
                            <Row>
                                <Col>
                                    <Field name="sink">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Sink:</Form.Label>
                                                <Form.Control placeholder="2" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="commode">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Commode:</Form.Label>
                                                <Form.Control placeholder="1" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="bidet">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Bidet:</Form.Label>
                                                <Form.Control placeholder="1" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="isPrimary">
                                        {({input, meta}) => (
                                            <Form.Check 
                                                type="checkbox"
                                                label="This bathroom is a primary bathroom"
                                                {...input}
                                            />
                                        )}
                                    </Field>
                                </Col>
                                <Col>
                                    <Field name="bathtubs">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Bathtubs:</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="showers">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Showers:</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="tubsShowers">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tubs/showers</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                </Col>
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                                </Row>
                            </Form>
                        )}
                    </ReactFinalForm>
                </Tab>
            </Tabs>
            
            

        </Row>
    );
}

export default BathroomForm;