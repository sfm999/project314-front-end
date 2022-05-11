import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import CustomerProfile from './components/CustomerProfile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ContractorSignUp from './components/ContractorSignUp';
import ContractorSignIn from './components/ContractorSignIn';

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/CustomerProfile" element={<CustomerProfile />} /> 
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ContractorSignUp" element={<ContractorSignUp />} />
          <Route path="/ContractorSignIn" element={<ContractorSignIn />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
} 
 //<Route path="/SignIn" element={<SignIn />} />
export default App;
