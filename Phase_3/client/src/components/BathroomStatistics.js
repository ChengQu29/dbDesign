import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const BathroomStatistics = () => {
    const [form1, setForm1] = useState({});
    const [form2, setForm2] = useState({});
    const [form3, setForm3] = useState({});
    const [form4, setForm4] = useState({});
    const [form5, setForm5] = useState({});
    const [form6, setForm6] = useState({});
    const [form7, setForm7] = useState({});
    const [form8, setForm8] = useState({});
    const [form9, setForm9] = useState({});
    const [form10, setForm10] = useState({});
    const [form11, setForm11] = useState({});
    const [form12, setForm12] = useState({});
    const {register, handleSubmit} = useForm('');

    useEffect(() => {
        const fetchData = async () => {
            const url1 = 'http://127.0.0.1:5000/reports/BathroomStatistics1'
            const res1 = await axios.get(`${url1}`)
            // console.log(res.data['result'])
            setForm1(res1.data['result'])
            
            
            const url2 = 'http://127.0.0.1:5000/reports/BathroomStatistics2'
            const res2 = await axios.get(`${url2}`)
            // console.log(res.data['result'])
            setForm2(res2.data['result'])
            
            
            const url3 = 'http://127.0.0.1:5000/reports/BathroomStatistics3'
            const res3 = await axios.get(`${url3}`)
            // console.log(res.data['result'])
            setForm3(res3.data['result'])
            
            
            const url4 = 'http://127.0.0.1:5000/reports/BathroomStatistics4'
            const res4 = await axios.get(`${url4}`)
            // console.log(res.data['result'])
            setForm4(res4.data['result'])
            
            
            const url5 = 'http://127.0.0.1:5000/reports/BathroomStatistics5'
            const res5 = await axios.get(`${url5}`)
            // console.log(res.data['result'])
            setForm5(res5.data['result'])
            
            
            const url6 = 'http://127.0.0.1:5000/reports/BathroomStatistics6'
            const res6 = await axios.get(`${url6}`)
            // console.log(res.data['result'])
            setForm6(res6.data['result'])
            
            
            const url7 = 'http://127.0.0.1:5000/reports/BathroomStatistics7'
            const res7 = await axios.get(`${url7}`)
            // console.log(res.data['result'])
            setForm7(res7.data['result'])
            
            
            const url8 = 'http://127.0.0.1:5000/reports/BathroomStatistics8'
            const res8 = await axios.get(`${url8}`)
            // console.log(res.data['result'])
            setForm8(res8.data['result'])
            
            
            const url9 = 'http://127.0.0.1:5000/reports/BathroomStatistics9'
            const res9 = await axios.get(`${url9}`)
            // console.log(res.data['result'])
            setForm9(res9.data['result'])

            const url10 = 'http://127.0.0.1:5000/reports/MostBidetsState'
            const res10 = await axios.get(`${url10}`)
            // console.log(res.data['result'])
            setForm10(res10.data['result'])

            const url11 = 'http://127.0.0.1:5000/reports/MostBidetsPostal'
            const res11 = await axios.get(`${url11}`)
            // console.log(res.data['result'])
            setForm11(res11.data['result'])

            const url12 = 'http://127.0.0.1:5000/reports/PrimaryBathHouseholds'
            const res12 = await axios.get(`${url12}`)
            // console.log(res.data['result'])
            setForm12(res12.data['result'])            
        }
        fetchData()

    }, [])

	
    return(
        <div>
            <h3>Bathroom Statistics</h3>
            
            
            
            
            {/* <div>{ JSON.stringify(form1) !== '{}' ? JSON.stringify(form1) :undefined}</div> */}
            <h4>Bathrooms per Household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form1 && form1.map && form1.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
            {/* <div>{ JSON.stringify(form2) !== '{}' ? JSON.stringify(form2) :undefined}</div> */}
            <h4>half bathrooms per household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form2 && form2.map && form2.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
            {/* <div>{ JSON.stringify(form3) !== '{}' ? JSON.stringify(form3) :undefined}</div> */}
            <h4>full bathrooms per household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form3 && form3.map && form3.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
            {/* <div>{ JSON.stringify(form4) !== '{}' ? JSON.stringify(form4) :undefined}</div> */}
            <h4>commodes per household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form4 && form4.map && form4.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
            {/* <div>{ JSON.stringify(form5) !== '{}' ? JSON.stringify(form5) :undefined}</div> */}
            <h4>sinks per household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form5 && form5.map && form5.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
            {/* <div>{ JSON.stringify(form6) !== '{}' ? JSON.stringify(form6) :undefined}</div> */}
            <h4>bidets per household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form6 && form6.map && form6.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
            {/* <div>{ JSON.stringify(form7) !== '{}' ? JSON.stringify(form7) :undefined}</div> */}
            <h4>bathtubs per household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form7 && form7.map && form7.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
            {/* <div>{ JSON.stringify(form8) !== '{}' ? JSON.stringify(form8) :undefined}</div> */}
            <h4>showers per household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form8 && form8.map && form8.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
            {/* <div>{ JSON.stringify(form9) !== '{}' ? JSON.stringify(form9) :undefined}</div> */}
            <h4>tub/showers per household</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>min</th>
                        <th>avg(tenths decimal precision)</th>
                        <th>max</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form9 && form9.map && form9.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                            <td> {row[2]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
           
            
            
            
            {/* <div>{ JSON.stringify(form10) !== '{}' ? JSON.stringify(form10) :undefined}</div> */}
            <h4>State with Most Bidets</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>number</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form10 && form10.map && form10.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
           
            
            
            
            {/* <div>{ JSON.stringify(form11) !== '{}' ? JSON.stringify(form11) :undefined}</div> */}
            <h4>Postal Code with Most Bidets</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Postal Code</th>
                        <th>num</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form11 && form11.map && form11.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                            <td> {row[1]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
           
            
            
            
            {/* <div>{ JSON.stringify(form12) !== '{}' ? JSON.stringify(form12) :undefined}</div> */}
            <h4>Households with only Primary Bath</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>num</th>
                    </tr>
                </thead>
                <tbody>
                { 
             form12 && form12.map && form12.map((row) => {
                return(<tr key={row[0]}>
                            <td> {row[0]} </td>
                        </tr> )
                }) }
                </tbody>
            </Table>
            
            
            
            
 

        </div>
    )
}

export default BathroomStatistics