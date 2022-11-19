import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function SucceedPage() {
  return (
    <Row>
      <h3>Submission complete!</h3>
      <p>Thank you for providing your information to Hemkraft!</p>
      <p><Link to="/">Return to the main menu</Link></p>
    </Row>
  );
}

export default SucceedPage;
