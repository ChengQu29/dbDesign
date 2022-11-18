import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import axios from 'axios';




const Top25Manufacturers = () => {
    const [top25, setTop25] = useState({});
    const [manufacturerDrillDown, setManufacturerDrillDown] = useState({});
    const {register, handleSubmit} = useForm('');

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://127.0.0.1:5000/reports/top25manufacturers'
            const res = await axios.get(`${url}`)
            // console.log(res.data['result'])
            setTop25(res.data['result'])
        }
        fetchData()


    }, [])


    const onSubmitFunc = async (data) => {
        const manufacturer= data['manufacturer']
        const url = 'http://127.0.0.1:5000/reports/manufacturer_drill_down/'
        const res = await axios.get(`${url}/${manufacturer}`)
        console.log(res.data['result'])
        setManufacturerDrillDown(res.data['result'])
    };



    return(
        <div>
            {/* Top 25 Table */}
            <h3>Top 25 Manufacturers</h3>
            <div>
                    { JSON.stringify(top25) !== '{}' ?
                    JSON.stringify(top25) 
                    :
                    undefined}
            </div>
        
            {/* Drill Down Report */}
            <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manufacturer Drill Down</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Form onSubmit = {handleSubmit(onSubmitFunc)}>
                                        <Form.Group>
                                            <Form.Label>Enter a Manufacturer</Form.Label>
                                            <Form.Control type="manufacturer" placeholder="e.g. Whirlpool"  {...register("manufacturer")}></Form.Control>
                                        </Form.Group>
                                    <Button as='input' type='submit' value='submit' className="mt-2"	></Button>{' '}
                                </Form>
                            </Row>
                            <div>{ JSON.stringify(manufacturerDrillDown) !== '{}' ?
                             JSON.stringify(manufacturerDrillDown) 
                             :
                            undefined}</div>
                        </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </div>
    )
}

export default Top25Manufacturers