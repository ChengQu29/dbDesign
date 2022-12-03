import { useEffect } from "react";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const HouseHoldAvgByRadiusReport = () => {
    const [radiusResult, setRadiusResult] = useState({});
    const postalCodeInformationState = useSelector(state => state.household.postalCodeInformation);
    const radiusState = useSelector(state => state.radius);
    const [acceptedRes, setAcceptedRes] = useState();


    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://127.0.0.1:5000/reports/radiusReport/${radiusState.postalCode}/${postalCodeInformationState.lon}/${postalCodeInformationState.lat}/${radiusState.radius}`)
            const avgNumOccupants = res.data['result'][0][0]
            console.log(avgNumOccupants)
            if (avgNumOccupants === null){
                setAcceptedRes(false)
                return
            }
            setAcceptedRes(true)

            setRadiusResult(res.data['result'])
        }
        fetchData()
    }, [])

    return(
        <div>
            <h3>Household Averages By Radius Report</h3>

            {acceptedRes === false &&
            <Alert key="danger" variant="danger" className="mt-2" >
            non-existing data, please change your search criteria      
            </Alert>}

            {acceptedRes && 
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Postal code input</th>
                        <th>Search radius </th>
                        <th>Average number of occupants </th>
                        <th>Average number of bedrooms </th>
                        <th>Average number of bathrooms </th>
                        <th>Ratio of commodes to occupants </th>
                        <th>Number of appliances</th>
                        <th>Most common heat source</th>
                    </tr>
                </thead>
                <tbody>
                {
                radiusResult && radiusResult.map && radiusResult.map((row) => {
                    return(
                        <tr key={row[0]}>
                            <td>{radiusState.postalCode}</td>
                            <td>{radiusState.radius}</td>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                            <td>{row[4]}</td>
                            <td>{row[5]}</td>
                        </tr> 
                    )
                }) }
                </tbody>
            </Table>
            }
        </div>
    )
}

export default HouseHoldAvgByRadiusReport;