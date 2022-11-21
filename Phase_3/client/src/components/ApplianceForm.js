import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Form as ReactFinalForm, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAppliance } from "../Slices/applianceSlice";

const ApplianceForm = () => {
    const [applianceType, setApplianceType] = useState('freezer');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async form => {
        console.log("Success");
        console.log("Appliance form content:", form);
        let consolidatedForm = {...form, manufacturer: form.manufacturer ? form.manufacturer : "ge", applianceType: applianceType ? applianceType : "freezer"};
        if (applianceType === 'freezer') {
            consolidatedForm = {...consolidatedForm, freezerType: form.freezerType ? form.freezerType : "bottomFreezerRefrigerator"};
        } else if (applianceType === 'tv') {
            consolidatedForm = {
                ...consolidatedForm,
                displayType: form.displayType ? form.displayType : "tube",
                maximumResolution: form.maximumResolution ? form.maximumResolution : "480i",
            }
        } else if (applianceType === 'dryer') {
            consolidatedForm = {
                ...consolidatedForm,
                dryerHeatSource: form.dryerHeatSource ? form.dryerHeatSource : "gas",
            }
        } else if (applianceType === 'washer') {
            consolidatedForm = {
                ...consolidatedForm,
                loadingType: form.loadingType ? form.loadingType : "top",
            }
        } else if (applianceType === 'cooker') {
            consolidatedForm = {
                ...consolidatedForm,
            }
            if (form.isOven) {
                consolidatedForm = {
                    ...consolidatedForm,
                    ovenHeatSource: form.ovenHeatSource,
                    cookerType: form.cookerType ? form.cookerType : "convection",
                }
            }
            if (form.isCooktop) {
                consolidatedForm = {
                    ...consolidatedForm,
                    cooktopHeatSource: form.cooktopHeatSource ? form.cooktopHeatSource : "gas",
                }
            }
        }
        console.log("Consolidated Appliance form content:", consolidatedForm);
        dispatch(addAppliance({...consolidatedForm}));
        navigate("/appliances");
    };
    const selectChange = (e) => {
        setApplianceType(e.target.value);
    };
    const validateForm = values => {
        console.log(values);
        const errors = {};
        if (applianceType === 'freezer') {
            // There is no need for validation because freezer has all required fields pre-selected;
        } else if (applianceType === 'tv') {
            if (!values.displaySize) {
                errors.displaySize = 'Required';
            } else {
                const displaySizePattern = /^(?:0|[1-9]\d+|)?(?:.?\d{0,1})?$/;
                if (!values.displaySize.match(displaySizePattern)) {
                    errors.displaySize = 'Display size format is incorrect';
                }
            }
        } else if (applianceType === 'dryer') {
            // There is no need for validation because dryer has all required fields pre-selected;
        } else if (applianceType === 'washer') {
            // There is no need for validation because washer has all required fields pre-selected;
        } else if (applianceType === 'cooker') {
            if (values.isOven) {
                if (!!values.ovenHeatSource && values.ovenHeatSource.length === 0) {
                    errors.ovenHeatSource = 'An oven can have one or more of the above heat sources'
                }
            }
        }
        return errors;
    };
    return (
        <Row>
            <h3>Add Appliance</h3>
            <p>Please provide the details for the appliance.</p>
            <Form.Group className="mb-3">
                <Form.Label>Appliance type:</Form.Label>
                <Form.Select onChange={selectChange}>
                    <option value="freezer">Refrigerator/Freezer</option>
                    <option value="cooker">Cooker</option>
                    <option value="washer">Washer</option>
                    <option value="dryer">Dryer</option>
                    <option value="tv">TV</option>
                </Form.Select>
            </Form.Group>
            <ReactFinalForm onSubmit={onSubmit} validate={validateForm}>
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <Row>
                            <Field name="manufacturer">
                                {({input, meta}) => (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Manufacturer:</Form.Label>
                                        <Form.Select {...input}>
                                            <option value="ge">GE</option>
                                            <option value="lg">LG</option>
                                            <option value="sumsung">Sumsung</option>
                                        </Form.Select>
                                        {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                    </Form.Group>
                                )}
                            </Field>
                            <Field name="modelName">
                                {({input, meta}) => (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Model name:</Form.Label>
                                        <Form.Control placeholder="Hoovsporken" {...input} />
                                        {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                    </Form.Group>
                                )}
                            </Field>
                            {
                                applianceType === 'freezer' ?
                                <Field name="freezerType">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Freezer type:</Form.Label>
                                            <Form.Select {...input}>
                                                <option value="bottomFreezerRefrigerator">Bottom freezer refrigerator</option>
                                                <option value="frenchDoorRefrigerator">French door refrigerator</option>
                                                <option value="sideBySideRefrigerator">Side-by-side refrigerator</option>
                                                <option value="topFreezerRefrigerator">Top freezer refrigerator</option>
                                                <option value="chestFreezer">Chest freezer</option>
                                                <option value="uprightFreezer">Upright freezer</option>
                                            </Form.Select>
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>: null
                            }
                            {
                                applianceType === 'tv' ?
                                <>
                                    <Field name="displayType">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Display type:</Form.Label>
                                                <Form.Select {...input}>
                                                    <option value="tube">Tube</option>
                                                    <option value="dlp">DLP</option>
                                                    <option value="plasma">Plasma</option>
                                                    <option value="LCD">LCD</option>
                                                    <option value="LED">LED</option>
                                                </Form.Select>
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="displaySize">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Display size:</Form.Label>
                                                <Form.Control placeholder="1023.5" {...input} />
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="maximumResolution">
                                        {({input, meta}) => (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Maximum resolution:</Form.Label>
                                                <Form.Select {...input}>
                                                    <option value="480i">480i</option>
                                                    <option value="576i">576i</option>
                                                    <option value="720p">720p</option>
                                                    <option value="1080i">1080i</option>
                                                    <option value="1080p">1080p</option>
                                                    <option value="1440p">1440p</option>
                                                    <option value="2160p(4K)">2160p(4K)</option>
                                                    <option value="4320p(8K)">4320p(8K)</option>
                                                </Form.Select>
                                                {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                            </Form.Group>
                                        )}
                                    </Field>
                                </>: null
                            }
                            {
                                applianceType === 'washer' ?
                                <Field name="loadingType">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Loading type:</Form.Label>
                                            <Form.Select {...input}>
                                                <option value="top">Top</option>
                                                <option value="bottom">Bottom</option>
                                            </Form.Select>
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>: null
                            }
                            {
                                applianceType === 'dryer' ?
                                <Field name="dryerHeatSource">
                                    {({input, meta}) => (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Heat source:</Form.Label>
                                            <Form.Select {...input}>
                                                <option value="gas">Gas</option>
                                                <option value="electric">Electric</option>
                                                <option value="none">None</option>
                                            </Form.Select>
                                            {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                        </Form.Group>
                                    )}
                                </Field>: null
                            }
                            {
                                applianceType === 'cooker' ?
                                (<>
                                    <Col>
                                        <Row>
                                            <label>
                                                <Field
                                                    name="isOven"
                                                    component="input"
                                                    type="checkbox"
                                                />{' '}
                                                Oven
                                            </label>
                                        </Row>
                                        <Row>
                                            <label>
                                                Heat source:
                                            </label>
                                            <label>
                                                <Field
                                                    name="ovenHeatSource"
                                                    component="input"
                                                    type="checkbox"
                                                    value="gas"
                                                    disabled={!props.values.isOven}
                                                />{' '}
                                                Gas
                                            </label>
                                            <label>
                                                <Field
                                                    name="ovenHeatSource"
                                                    component="input"
                                                    type="checkbox"
                                                    value="electric"
                                                    disabled={!props.values.isOven}
                                                />{' '}
                                                Electric
                                            </label>
                                            <label>
                                                <Field
                                                    name="ovenHeatSource"
                                                    component="input"
                                                    type="checkbox"
                                                    value="microwave"
                                                    disabled={!props.values.isOven}
                                                />{' '}
                                                Microwave
                                            </label>
                                            <label>
                                                <Field
                                                    name="ovenHeatSource"
                                                >
                                                    {({input, meta}) => (
                                                        (meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>
                                                    )}
                                                </Field>
                                            </label>
                                        </Row>
                                        <Row>
                                            <Field name="cookerType" >
                                                {({input, meta}) => (
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Type:</Form.Label>
                                                        <Form.Select {...input} disabled={!props.values.isOven}>
                                                            <option value="convection">Convection</option>
                                                            <option value="conventional">Conventional</option>
                                                        </Form.Select>
                                                        {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                                    </Form.Group>
                                                )}
                                            </Field>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <label>
                                                <Field
                                                    name="isCooktop"
                                                    component="input"
                                                    type="checkbox"
                                                />{' '}
                                                Cooktop
                                            </label>
                                        </Row>
                                        <Row>
                                            <Field name="cooktopHeatSource" >
                                                {({input, meta}) => (
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Type:</Form.Label>
                                                        <Form.Select {...input} disabled={!props.values.isCooktop}>
                                                            <option value="gas">Gas</option>
                                                            <option value="electric">Electric</option>
                                                            <option value="radiantElectric">Radiant Electric</option>
                                                            <option value="induction">Induction</option>
                                                        </Form.Select>
                                                        {(meta.error || meta.submitError) && meta.touched && <Form.Text bsPrefix="text-danger">{meta.error || meta.submitError}</Form.Text>}
                                                    </Form.Group>
                                                )}
                                            </Field>
                                        </Row>
                                    </Col>
                                </>) : null
                            }
                        </Row>
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

export default ApplianceForm;