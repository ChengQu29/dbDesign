import './App.css';
import {EmailForm} from "./components/household/emailform"
import { PostalCodeForm } from './components/household/postalform';
import {NavBarComponent} from "./components/common/navbar"

/* The following line can be included in your src/index.js or App.js file */
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <NavBarComponent/>
      <EmailForm/>
      <PostalCodeForm/>
    </div>
  );
}

export default App;
