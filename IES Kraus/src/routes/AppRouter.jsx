import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import DashboardAdmin from '../pages/DashboardAdmin';
import DashboardProfesor from '../pages/DashboardProfesor';
import RutaPrivada from './RutaPrivada';
import SubirJustificante from '../pages/SubirJustificante';
import MisJustificantes from '../pages/MisJustificantes';
import SolicitarDiaLibre from '../pages/SolicitarDiaLibre';
import MisSolicitudes from '../pages/MisSolicitudes';



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
        <Route
          path="/subir-justificante"
          element={
            <RutaPrivada>
              <SubirJustificante />
            </RutaPrivada>
          }
        />
        <Route
          path="/mis-justificantes"
          element={
            <RutaPrivada>
              <MisJustificantes />
            </RutaPrivada>
          }
        />
        <Route
          path="/solicitar-dia-libre"
          element={
            <RutaPrivada>
              <SolicitarDiaLibre />
            </RutaPrivada>
          }
        />

        <Route
          path="/mis-solicitudes"
          element={
            <RutaPrivada>
              <MisSolicitudes />
            </RutaPrivada>
          }
        />

      </Routes>
    </BrowserRouter>
  );
  
}