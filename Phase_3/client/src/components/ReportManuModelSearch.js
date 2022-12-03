import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

 const ReportManuModelSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ManuModelSearch, setManuModelSearch] = useState([]);
    const [acceptedRes, setAcceptedRes] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit} = useForm('');

    const onSubmitFunc = async (data) =>{
      setManuModelSearch([])
      const ManuModel = data['keyword']
      if (!ManuModel){
        setAcceptedRes(false)
        return
    }
      setSearchTerm(data['keyword']);
      const url = 'http://127.0.0.1:5000/reports/ManuModelSearch'
      setIsLoading(true);
      const res = await axios.get(`${url}/${ManuModel}`)
      if (res.data['result'].length === 0){
        setAcceptedRes(false)
        return
    }
      setAcceptedRes(true)
      setIsLoading(false);
      setManuModelSearch(res.data['result'])
    }
   console.log(ManuModelSearch);
    
return(
<Row>
  <h3>Manufacturer / Model Search</h3>
    <Form onSubmit = {handleSubmit(onSubmitFunc)}>
      <Form.Group>
        <Form.Label>Please Enter the Keyword to Search:</Form.Label>
        <Form.Control type="keyword" placeholder='e.g.Whirl' {...register("keyword")}></Form.Control>
      </Form.Group>
      <Button as='input' type='submit' value='submit' className='mt-2'></Button>{''}
    </Form>

      {/* error message for input */}
      {acceptedRes === false &&
      <Alert key="danger" variant="danger" className="mt-2" >
          empty input or non-existing data        
      </Alert>
      }

    { acceptedRes && isLoading ? "Loading ..." :
    <Table bordered hover>
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Model</th>
        </tr>
      </thead>
      <tbody>
        {ManuModelSearch && ManuModelSearch.map && ManuModelSearch.map((row, index) =>{
          if (row[1]) {
            return(<tr key={index}>
              <td style={{whiteSpace: "pre-wrap", backgroundColor: (searchTerm !== undefined && searchTerm !== null && row[0] !== null && row[0].toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1)?"#90EE90":""}}>{row[0]}</td>
              <td style={{whiteSpace: "pre-wrap", backgroundColor: (searchTerm !== undefined && searchTerm !== null && row[1] !== null && row[1].toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1)?"#90EE90":""}}>{row[1]}</td>
            </tr> ) }
        }) }
      </tbody>
    </Table>
    }
</Row>
)
 }

export default ReportManuModelSearch;