import { useNavigate } from 'react-router-dom';

export default function DashboardProfesor() {
  const navigate = useNavigate();

  const manejarJustificante = () => {
    console.log('Ir a subir justificante');
    navigate('/subir-justificante');
  };

  const manejarCalendario = () => {
    console.log('Ir a ver calendario');
    // navigate('/calendario');
  };

  const manejarSolicitud = () => {
    console.log('Ir a solicitud de día libre');
    navigate('/solicitar-dia-libre');
  };

  const manejarMisJustificantes = () => {
  navigate('/mis-justificantes');
  };

  const manejarMisSolicitudes = () => {
  navigate('/mis-solicitudes');
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Panel del Profesor</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <button
          onClick={manejarJustificante}
          className="bg-white border rounded-xl p-6 shadow hover:shadow-md hover:bg-blue-50 transition"
        >
          <span role="img" aria-label="justificante" className="text-4xl">📄</span>
          <h2 className="text-xl font-semibold mt-2">Subir justificante</h2>
        </button>

        <button
          onClick={manejarCalendario}
          className="bg-white border rounded-xl p-6 shadow hover:shadow-md hover:bg-blue-50 transition"
        >
          <span role="img" aria-label="calendario" className="text-4xl">📆</span>
          <h2 className="text-xl font-semibold mt-2">Ver calendario</h2>
        </button>

        <button
          onClick={manejarSolicitud}
          className="bg-white border rounded-xl p-6 shadow hover:shadow-md hover:bg-blue-50 transition"
        >
          <span role="img" aria-label="solicitud" className="text-4xl">📝</span>
          <h2 className="text-xl font-semibold mt-2">Solicitar día libre</h2>
        </button>

        <button
          onClick={manejarMisJustificantes}
          className="bg-white border rounded-xl p-6 shadow hover:shadow-md hover:bg-blue-50 transition"
        >
          <span role="img" aria-label="mis justificantes" className="text-4xl">📁</span>
          <h2 className="text-xl font-semibold mt-2">Mis Justificantes</h2>
        </button>

        <button
          onClick={manejarMisSolicitudes}
          className="bg-white border rounded-xl p-6 shadow hover:bg-blue-50 transition"
        >
          <span role="img" aria-label="mis solicitudes" className="text-4xl">📋</span>
          <h2 className="text-xl font-semibold mt-2">Mis Solicitudes</h2>
        </button>

      </div>
    </div>
  );
}
