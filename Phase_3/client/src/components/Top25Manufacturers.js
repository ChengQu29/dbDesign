import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const Top25Manufacturers = () => {
    const [top25, setTop25] = useState({});
    // const [manufacturerDrillDown, setManufacturerDrillDown] = useState({});
    const [manufacturerDrillDownAll, setManufacturerDrillDownAll] = useState({});
    const [acceptedRes, setAcceptedRes] = useState();
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
        if (!manufacturer){
            setAcceptedRes(false)
            return
        }
        const url = 'http://127.0.0.1:5000/reports/manufacturer_drill_down/'
        const res = await axios.get(`${url}/${manufacturer}`)
        console.log(res)

        if (res.data['result'].length === 0){
            setAcceptedRes(false)
            return
        }
        setAcceptedRes(true)
        // console.log(res.data['result'])
        const temp = {'Dryer': 0, 'Washer': 0, 'Cooker': 0, 'Freezer': 0, 'TV': 0}
        res.data['result'].map( (item) => {
            temp[item[0]] = item[1]
            return(null)
        } )
        setManufacturerDrillDownAll(temp)

        // setManufacturerDrillDown(res.data['result'])
    };

    return(
        <div>
            <h3>Top 25 Manufacturers</h3>
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
                            {/* <div>{ JSON.stringify(manufacturerDrillDownAll) !== '{}' ? JSON.stringify(manufacturerDrillDownAll) : undefined}</div> */}
                            
                            {/* error message */}
                            {acceptedRes === false &&
                            <Alert key="danger" variant="danger">
                                empty input or non-existing data        
                            </Alert>
                            }

                            { acceptedRes && 
                            <Table >
                                <thead>
                                    <tr>
                                        <th>Appliance</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {/* { manufacturerDrillDown && manufacturerDrillDown.map && manufacturerDrillDown.map((row) => {
                                return(<tr key={row[0]}>
                                            <td> {row[0]} </td>
                                            <td>{row[1]} </td>
                                        </tr> )
                                }) } */}

                                {manufacturerDrillDownAll && Object.keys(manufacturerDrillDownAll).map && Object.keys(manufacturerDrillDownAll).map((key) => {
                                    return (<tr key={key}>
                                        <td style={{whiteSpace: "pre-wrap"}}> {key} </td>
                                        <td>{manufacturerDrillDownAll[key]} </td>
                                        </tr>)
                                    })}


                                </tbody>
                            </Table>
                            }

                        </Accordion.Body>
                </Accordion.Item>
            </Accordion>



        </div>
    )
}

export default Top25Manufacturers