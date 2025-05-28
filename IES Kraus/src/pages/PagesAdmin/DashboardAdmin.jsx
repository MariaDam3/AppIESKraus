import { Link } from "react-router-dom";

export default function DashboardAdmin() {
  return (
    <div>
      <h2>Panel de Administración</h2>
      <ul>
        <li><Link to="/admin/cuentas">Gestión de cuentas</Link></li>
        <li><Link to="/admin/justificantes">Justificantes</Link></li>
        <li><Link to="/admin/solicitudes">Solicitudes</Link></li>
        <li><Link to="/admin/calendario">Calendario global</Link></li>
        <li><Link to="/admin/historial">Historial de actividad</Link></li>
        <li><Link to="/admin/normativas">Normativas</Link></li>
      </ul>
    </div>
  );
}
