import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector(state => state.household);
  console.log(state);
  return (
    <Row>
      <h3>Welcome to Hemkraft!</h3>
      <p>Please choose what you'd like to do:</p>
      <p><Link to="/household/email">Enter my house info</Link></p>
      <p><Link to="/reports">View reports/query data</Link></p>  
    </Row>
  );
}

export default App;
