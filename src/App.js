import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import People from './pages/people';
function App() {
  return (
    <>
      <Routes>
        <Route path="/people" element={<People/>}>
        </Route>
        <Route path="/" element={<Navigate to="/people"  />}></Route>
      </Routes>
    </>
  );
}

export default App;