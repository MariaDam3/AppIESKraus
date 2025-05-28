import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function MisSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) return;

      const { data, error } = await supabase
        .from('solicitudes_dias_libres')
        .select('*')
        .eq('usuario_id', userId)
        .order('fecha_inicio', { ascending: false });

      if (!error) {
        setSolicitudes(data);
      }

      setCargando(false);
    };

    obtenerSolicitudes();
  }, []);

  if (cargando) return <div className="p-4">Cargando solicitudes...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Mis Solicitudes de Día Libre</h2>
      {solicitudes.length === 0 ? (
        <p>No has enviado ninguna solicitud aún.</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b font-semibold">
              <th className="p-2">📅 Fecha</th>
              <th className="p-2">📝 Motivo</th>
              <th className="p-2">🚦 Estado</th>
              <th className="p-2">💬 Comentario</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{s.fecha_inicio}</td>
                <td className="p-2">{s.motivo}</td>
                <td className="p-2 capitalize">{s.estado}</td>
                <td className="p-2">{s.comentario_admin || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
