import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmployee from './routes/create-employee/page';
import EmployeeList from './routes/employee-list/page';
import './app.css';

/**
 * Composant principal de l'application
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App; 