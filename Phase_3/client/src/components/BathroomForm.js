import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBathroom } from "../Slices/bathroomSlice";

const BathroomForm = () => {
    const [key, setKey] = useState('half');
    const currentBathrooms = useSelector(state => state.bathrooms.bathrooms)
    const hasPrimaryBathroom = currentBathrooms.findIndex(bathroom => bathroom.isPrimary) !== -1;
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
        const sink = values.sink ? values.sink : "0";
        const commode = values.commode ? values.commode : "0";
        const bidet = values.bidet ? values.bidet : "0";
        const numberPattern = /^[0-9]+$/;
        if (!sink.match(numberPattern)) {
            errors.sink = 'Sink format is incorrect';
        }
        if (!commode.match(numberPattern)) {
            errors.commode = 'Commode format is incorrect';
        }
        if (!bidet.match(numberPattern)) {
            errors.bidet = 'Bidet format is incorrect';
        }
        if (parseInt(sink) + parseInt(commode) + parseInt(bidet) <= 0) {
            errors.halfFormError = 'You should at least have one sink or one commode or one bidet'
        }
        return errors;
    };
    const validateFullForm = values => {
        const errors = validateHalfForm(values);
        if (values.isPrimary) {
            const bathtub = values.bathtub ? values.bathtub : "0";
            const shower = values.shower ? values.shower : "0";
            const tubsShower = values.tubsShower ? values.tubsShower : "0";
            const numberPattern = /^[0-9]+$/;
            if (!bathtub.match(numberPattern)) {
                errors.bathtub = 'Bathtub format is incorrect';
            }
            if (!shower.match(numberPattern)) {
                errors.shower = 'Shower format is incorrect';
            }
            if (!tubsShower.match(numberPattern)) {
                errors.tubsShower = 'Tubs/shower format is incorrect';
            }
            if (parseInt(bathtub) + parseInt(shower) + parseInt(tubsShower) <= 0) {
                errors.fullFormError = 'Primary bathroom should at least have one bathtub or one shower or one tubs/shower'
            }
        }
        return errors;
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
                                <Field name="name">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Half bathroom name:</Form.Label>
                                            <Form.Control placeholder="basement" {...input} />
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>
                                <Field name="sink">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Sink:</Form.Label>
                                            <Form.Control placeholder="0" {...input} />
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>
                                <Field name="commode">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Commode:</Form.Label>
                                            <Form.Control placeholder="0" {...input} />
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>
                                <Field name="bidet">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Bidet:</Form.Label>
                                            <Form.Control placeholder="0" {...input} />
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>
                                <Field name="halfFormError">
                                    {({input, meta}) => (
                                        (meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>
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
                                <Row>
                                <Col>
                                    <Field name="sink">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Sink:</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="commode">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Commode:</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="bidet">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Bidet:</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <label>
                                        <Field
                                            disabled={hasPrimaryBathroom}
                                            name="isPrimary"
                                            component="input"
                                            type="checkbox"
                                        />{' '}
                                        isPrimary
                                    </label>
                                </Col>
                                <Col>
                                    <Field name="bathtub">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Bathtub:</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="shower">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Shower:</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="tubsShower">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tubs/shower</Form.Label>
                                                <Form.Control placeholder="0" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                </Col>
                                </Row>
                                <Row>
                                    <Field name="halfFormError">
                                        {({input, meta}) => (
                                            (meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>
                                        )}
                                    </Field>
                                    <Field name="fullFormError">
                                        {({input, meta}) => (
                                            (meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>
                                        )}
                                    </Field>
                                </Row>
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