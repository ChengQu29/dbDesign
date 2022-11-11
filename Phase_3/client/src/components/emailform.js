import {React, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
// bootstrap components
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import axios from 'axios';


export let EmailForm = () => {
    // declare the Hook form.
    // register: used to assign value of the form to variables
    // handleSubmit: to call the function that will handle the submission. In this example, it is onSubmitFunc
    const {register, handleSubmit} = useForm('');

    // react hook useState
    // apiResponse: the state
    // setApiResponse: the function that update the state
    // One important thing to know about the state is that if it is update, the component will be rerendered
    const [apiResponse, setApiResponse] = useState();


    const onSubmitFunc = async (data) => {
        const email = data['email']
        const url = 'http://127.0.0.1:5000/household'
        const res = fetch(`${url}/${email}`)
            .then(response => response.text())
            .then(data => setApiResponse(data)); // update the state. 
    };

    // the function that will be trigger once the form is submitted
    // const onSubmitFunc = async (data) => {
    //     const email = data['email']
    //     // console.log(email)
    //     const url = 'http://127.0.0.1:5000/household'
    //     const res = await axios.get(`${url}/${email}`);
    //     console.log(res.data['existed'])
    //     setApiResponse(res.data['existed'])
    //     // console.log(apiResponse)
    // };

    // useEffect( () => {
    //     // console.log(apiResponse)
    //     if (apiResponse === true) {
    //         console.log('acceptable email message')
    //     }
    //     else {
    //         console.log('email existed')
    //     }
    // }, [apiResponse]);
    
    return(
        <div>

            <Form onSubmit = {handleSubmit(onSubmitFunc)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Button as='input' type='submit' value='verify'></Button>{' '}
            </Form>
            <div>{apiResponse}</div>






        </div>
    )
}

