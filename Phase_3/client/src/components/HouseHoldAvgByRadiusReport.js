import { useEffect } from "react";
import { fetchRadisuReport, getRadiusReport } from "../Slices/radiusReportSlice";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const HouseHoldAvgByRadiusReport = () => {
    
    const [radiusResult, setRadiusResult] = useState({});

    const postalCodeInformationState = useSelector(state => state.household.postalCodeInformation);
    const radiusReportState = useSelector(state => state.radiusReport);

    useEffect(() => {
        const fetchData = async () => {
            const radius = 1000 //hardcode for testing
            //console.log("radius is: ", radiusReportState.radius) 
            const res = await axios.get(`http://127.0.0.1:5000/reports/radiusReport/${postalCodeInformationState.lon}/${postalCodeInformationState.lat}/${radius}`)
            
            console.log(res.data['result'])
            setRadiusResult(res.data['result'])
        }
        fetchData()
    }, [])

    return(
        <div>
            <h3>Household Averages By Radius Report</h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Postal code</th>
                        <th>Distance from input location </th>
                        <th>Average number of occupants </th>
                        <th>Average number of bedrooms </th>
                        <th>Average number of bathrooms </th>
                        <th>Ratio of commodes to occupants </th>
                    </tr>
                </thead>
                <tbody>
                {
                
                radiusResult && radiusResult.map && radiusResult.map((subArray, idx) => {
                    return(
                        <tr key={idx}>
                            {subArray.map((subitem, i) => {
                                return (
                                    <td> {subitem} </td>
                                );
                            })}
                                
                        </tr> 
                    )
                }) }
                </tbody>
            </Table>

        </div>
    )
}

export default HouseHoldAvgByRadiusReport;