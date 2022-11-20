import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const ExtraFridgeFreezerReport = () => {
    const [topForm, setTopForm] = useState({});
	const [bottomForm, setBottomForm] = useState({});
    const {register, handleSubmit} = useForm('');

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://127.0.0.1:5000/reports/ExtraFridgeFreezerReport1'
            const res = await axios.get(`${url}`)
            // console.log(res.data['result'])
            setTopForm(res.data['result'])
            
            
            const url1 = 'http://127.0.0.1:5000/reports/ExtraFridgeFreezerReport2'
            const res1 = await axios.get(`${url1}`)
            // console.log(res.data['result'])
            setBottomForm(res1.data['result'])           
        }
        fetchData()

    }, [])

	
    return(
        <div>
            <h3>Extra fridge/freezer report</h3>
            {/* <div>{ JSON.stringify(topForm) !== '{}' ? JSON.stringify(topForm) :undefined}</div> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Number of Households with More than One Fridge</th>
                    </tr>
                </thead>
                <tbody>
                { 
             topForm && topForm.map && topForm.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Top 10 States</th>
                        <th>Number of Households</th>
                        <th>Chest Household Percent</th>
                        <th>Upright Household Percent</th>
                        <th>Other Household Percent</th>
                    </tr>
                </thead>
                <tbody>
                { 
             bottomForm && bottomForm.map && bottomForm.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                            <td> {row[3]} </td>
                            <td> {row[4]} </td>                            
                        </tr> )
                }) }
                </tbody>
            </Table>


        </div>
    )
}

export default ExtraFridgeFreezerReport