import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MisJustificantes() {
  const [justificantes, setJustificantes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerJustificantes = async () => {
      const usuario = await supabase.auth.getUser();
      const userId = usuario.data.user.id;

      const { data, error } = await supabase
        .from('justificantes')
        .select('*')
        .eq('usuario_id', userId)
        .order('fecha', { ascending: false });

      if (!error) {
        setJustificantes(data);
      }

      setCargando(false);
    };

    obtenerJustificantes();
  }, []);

  if (cargando) return <div className="p-4">Cargando justificantes...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Mis Justificantes</h2>
      {justificantes.length === 0 ? (
        <p>No has enviado ningún justificante aún.</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Fecha</th>
              <th className="p-2">Motivo</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Archivo</th>
            </tr>
          </thead>
          <tbody>
            {justificantes.map((j) => (
              <tr key={j.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{j.fecha}</td>
                <td className="p-2">{j.motivo}</td>
                <td className="p-2">{j.estado}</td>
                <td className="p-2">
                  <a
                    href={j.archivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Ver archivo
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
