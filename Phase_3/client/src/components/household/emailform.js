import {React, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
// bootstrap components
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


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
    const [emailAlert, setEmailAlert] = useState({});
    

    // the function that will be trigger once the form is submitted
    const onSubmitFunc = async (data) => {
        console.log(emailAlert)
        const email = data['email']
        const url = 'http://127.0.0.1:5000/household'
        const res = await axios.get(`${url}/${email}`);
        setApiResponse(res.data['existed'])
    };


    // useEffect with dependency apiResponse.
    // set state for emailAlert once we have a change in the state of apiResponse
    // use emailAlert to render the <Alert> tag down below
    useEffect ( () => {
        // set this condition to prevent useEffect when the empty state apiResponse was created
        if  (apiResponse !== undefined ) {
        setEmailAlert( apiResponse !== undefined && apiResponse === true ? 
            {'type':'danger', 'message':'The email has existed'} :
            {'type':'primary', 'message':'The email is good'})
        }
    }, [apiResponse])


    
    return(
        <div>

            <Form onSubmit = {handleSubmit(onSubmitFunc)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                { Object.keys(emailAlert).length !== 0 &&
                    <Alert key={emailAlert['type']} variant={emailAlert['type']}>
                        {emailAlert['message']}
                    </Alert>
                }

                <Button as='input' type='submit' value='verify'></Button>{' '}
            </Form>

            {/* fpr debug */}
            {/* <div>{apiResponse !== undefined ? apiResponse.toString() : undefined}</div> */}





        </div>
    )
}

