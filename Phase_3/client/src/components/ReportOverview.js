import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function ReportOverview() {
  return (
    <Row>
      <h3>View Reports</h3>
      <p>Please choose the report you'd like to review:</p>
      <p><Link to="/reports/top25manufacturers">Top 25 Popular Manufacturers </Link></p>  
      <p><Link to="/reports/ManuModelSearch">Manufacturer & Model Search</Link></p>
      <p><Link to="/reports/top25manufacturers">Average TV Display Size by State</Link></p>  
      <p><Link to="/reports/ExtraFridgeFreezerReport">Extra Fridge / Freezer Report </Link></p>  
      <p><Link to="/reports/laundryCenter">Laundry Center Report </Link></p>  
      <p><Link to="/reports/BathroomStatistics">Bathroom Statistics</Link></p>  
      <p><Link to="">Household average by radius </Link></p>  
    </Row>
  );
}

export default ReportOverview;
