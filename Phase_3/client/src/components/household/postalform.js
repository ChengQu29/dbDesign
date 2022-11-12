

import {React, useState, } from "react";
import {useForm} from "react-hook-form";
// bootstrap components
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


import axios from 'axios';


export let PostalCodeForm = () => {
    // declare the Hook form.
    // register: used to assign value of the form to variables
    // handleSubmit: to call the function that will handle the submission. In this example, it is onSubmitFunc
    const {register, handleSubmit} = useForm('');

    // react hook useState
    // apiResponse: the state
    // setApiResponse: the function that update the state
    // One important thing to know about the state is that if it is update, the component will be rerendered
    const [apiResponse, setApiResponse] = useState({});
    

    // the function that will be trigger once the form is submitted
    const onSubmitFunc = async (data) => {
        const postal_code = data['postal_code']
        const url = 'http://127.0.0.1:5000/postal_code'
        const res = await axios.get(`${url}/${postal_code}`)
        // console.log(res.data['result'])
        setApiResponse(res.data['result'])
    };



    return(
        <div>

            <Form onSubmit = {handleSubmit(onSubmitFunc)}>
                <Form.Group className="mb-3" controlId="formBasicPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="postal_code" placeholder="Enter PostalCode" {...register("postal_code")} />
                </Form.Group>
                <Button as='input' type='submit' value='verify'></Button>{' '}
            </Form>

            {/* for debug */}
            <div>{ JSON.stringify(apiResponse) !== '{}' ? JSON.stringify(apiResponse) : undefined}</div>

        </div>
    )
}

