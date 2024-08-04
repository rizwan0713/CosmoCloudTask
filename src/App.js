import './App.css';
import HomePage from './pages/HomePage';
import CreateEmployeePage from "./pages/CreateEmployeePage";
import { Route, Routes } from 'react-router-dom';
import EmployeeDetail from './pages/EmployeeDetail';
import Error404 from './pages/Error404';

function App() {
  return (
    <div className='w-full min-h-screen overflow-x-hidden box-border'>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/addemployee" element={<CreateEmployeePage />} />
        <Route path="/employee/:empId" element={<EmployeeDetail />}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </div>
   
  );
}

export default App;
