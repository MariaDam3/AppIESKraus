import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import DashboardAdmin from '../pages/DashboardAdmin';
import DashboardProfesor from '../pages/DashboardProfesor';
import RutaPrivada from './RutaPrivada';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RutaPrivada>
              <DashboardAdmin />
            </RutaPrivada>
          }
        />
        <Route
          path="/profesor"
          element={
            <RutaPrivada>
              <DashboardProfesor />
            </RutaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}