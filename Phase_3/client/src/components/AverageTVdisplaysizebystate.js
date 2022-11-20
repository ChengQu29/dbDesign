import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const AverageTVdisplaysizebystate = () => {
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
            <h3>Average TV display size by state</h3>
            {/* <div>{ JSON.stringify(top25) !== '{}' ? JSON.stringify(top25) :undefined}</div> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                { 
             top25 && top25.map && top25.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td>{row[1]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>

            <Accordion className="mt-5">
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
                            {/* <div>{ JSON.stringify(manufacturerDrillDown) !== '{}' ? JSON.stringify(manufacturerDrillDown) : undefined}</div> */}
                            
                            <Table >
                                <thead>
                                    <tr>
                                        <th>Appliance</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { manufacturerDrillDown && manufacturerDrillDown.map && manufacturerDrillDown.map((row) => {
                                return(<tr key={row[0]}>
                                            <td> {row[0]} </td>
                                            <td>{row[1]} </td>
                                        </tr> )
                                }) }
                                </tbody>
                            </Table>

                        </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </div>
    )
}

export default AverageTVdisplaysizebystate