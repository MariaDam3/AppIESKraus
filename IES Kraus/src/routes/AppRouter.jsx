import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import RutaPrivada from './RutaPrivada';
import DashboardAdmin from '../pages/PagesAdmin/DashboardAdmin';
import GestionCuentas from '../pages/PagesAdmin/GestionCuentas';
import GestionJustificantes from '../pages/PagesAdmin/GestionJustificantes';
import GestionSolicitudes from '../pages/PagesAdmin/GestionSolicitudes';
import CalendarioGlobal from '../pages/PagesAdmin/CalendarioGlobal';
import HistorialActividad from '../pages/PagesAdmin/HistorialActividad';
import GestionNormativas from '../pages/PagesAdmin/GestionNormativas';

import DashboardProfesor from '../pages/DashboardProfesor';
import SubirJustificante from '../pages/SubirJustificante';
import MisJustificantes from '../pages/MisJustificantes';



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
          path="/admin/cuentas"
          element={
            <RutaPrivada>
              <GestionCuentas />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin/justificantes"
          element={
            <RutaPrivada>
              <GestionJustificantes />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin/solicitudes"
          element={
            <RutaPrivada>
              <GestionSolicitudes />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin/calendario"
          element={
            <RutaPrivada>
              <CalendarioGlobal />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin/historial"
          element={
            <RutaPrivada>
              <HistorialActividad />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin/normativas"
          element={
            <RutaPrivada>
              <GestionNormativas />
            </RutaPrivada>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}