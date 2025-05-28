import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SolicitarDiaLibre() {
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    //console.error(error);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    if (!userId) {
      setMensaje('Usuario no identificado');
      return;
    }

    const { error } = await supabase
      .from('solicitudes_dias_libres')
      .insert([
        {
          usuario_id: userId,
          fecha_inicio: fecha, // 🔁 usa fecha_inicio ya que no tienes solo `fecha`
            fecha_fin: fecha,
          motivo: motivo,
          estado: 'pendiente',
          comentario_admin: ''
        }
      ]);

    if (error) {
      console.error(error);
      setMensaje('Error al enviar la solicitud.');
    } else {
      setMensaje('Solicitud enviada correctamente.');
      setMotivo('');
      setFecha('');
    }

    setTimeout(() => {
        window.location.href = '/mis-solicitudes';
        }, 1000);

  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Solicitar día libre</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
          required
        />
        {mensaje && <p className="text-blue-600">{mensaje}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar solicitud
        </button>
        
      </form>
    </div>
  );
}
