import { React, useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const LaundryCnt = () => {
  const [WasherDryer, setWasherDryer] = useState({});
  const [WasherNoDryer, setWasherNoDryer] = useState({});

  useEffect( () => {
    const fetchData = async () => {
      const washerDryerRes = await axios.get('http://127.0.0.1:5000/reports/LaundryCnt_WasherDryer');
      setWasherDryer(washerDryerRes.data['result'])
      const washerNoDryerRes = await axios.get('http://127.0.0.1:5000/reports/LaundryCnt_WasherNoDryer');
      setWasherNoDryer(washerNoDryerRes.data['result'])
    }
    fetchData()
  },[])

  return (
    <Row>
      <h3>Laundry Center Report</h3>
      <h5>Most Common Washer Type and Dryer Heat Source by State</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>State</th>
          <th>Washer Type</th>
          <th>Dryer Heat Source</th>
          </tr>
        </thead>
        <tbody>
        {
          WasherDryer && WasherDryer.map && WasherDryer.map((row) =>{
            return(<tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>)
          })
        }
        </tbody>
      </Table>
  
      <h5>Household with Washer No Dryer Count per State </h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>State</th>
            <th>Household Count</th>
          </tr>
        </thead>
        <tbody>
          {
            WasherNoDryer && WasherNoDryer.map && WasherNoDryer.map((row) =>{
              return(
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Row>
  );
}

export default LaundryCnt;