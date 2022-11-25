import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const AverageTVdisplaysizebystate = () => {
    const [top25, setTop25] = useState({});
    const [tvDrillDown, SetTvDrillDown] = useState({});
    const {register, handleSubmit} = useForm('');

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://127.0.0.1:5000/reports/AverageTVdisplaysizebystate'
            const res = await axios.get(`${url}`)
            // console.log(res.data['result'])
            setTop25(res.data['result'])
        }
        fetchData()
    }, [])

    const onSubmitFunc = async (data) => {
        const state= data['state']
        const url = 'http://127.0.0.1:5000/reports/AverageTVdisplaysizebystateDrilldown/'
        const res = await axios.get(`${url}/${state}`)
        console.log(res.data['result'])
        SetTvDrillDown(res.data['result'])
    };

    return(
        <div>
            <h3>Average TV display size by state</h3>
            {/* <div>{ JSON.stringify(top25) !== '{}' ? JSON.stringify(top25) :undefined}</div> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Average Display Size</th>
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
                    <Accordion.Header>Drill Down by State</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Form onSubmit = {handleSubmit(onSubmitFunc)}>
                                        <Form.Group>
                                            <Form.Label>Enter State</Form.Label>
                                            <Form.Control type="State" placeholder="e.g. CA"  {...register("state")}></Form.Control>
                                        </Form.Group>
                                    <Button as='input' type='submit' value='submit' className="mt-2"	></Button>{' '}
                                </Form>
                            </Row>
                            {/* <div>{ JSON.stringify(tvDrillDown) !== '{}' ? JSON.stringify(tvDrillDown) : undefined}</div> */}
                            
                            <Table >
                                <thead>
                                    <tr>
                                        <th>Screen Type</th>
										<th>Maximum Resolution</th>
										<th>Average Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { tvDrillDown && tvDrillDown.map && tvDrillDown.map((row) => {
                                return(<tr key={row[0]}>
                                            <td> {row[0]} </td>
                                            <td>{row[1]} </td>
											<td>{row[2]} </td>
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