import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SubirJustificante() {
  const [motivo, setMotivo] = useState('');
  const [fecha, setFecha] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    const usuario = await supabase.auth.getUser();
    const userId = usuario.data.user.id;

    if (!archivo) {
      setMensaje('Por favor, selecciona un archivo.');
      return;
    }

    // 1. Subir archivo a Supabase Storage
    const nombreArchivo = `${userId}-${Date.now()}-${archivo.name}`;
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('justificantes') // Asegúrate de haber creado este bucket
      .upload(nombreArchivo, archivo);

    if (storageError) {
        console.error('Error al subir archivo:', storageError);
        setMensaje('Error al subir el archivo.');
        return;
        }


     //2. Obtener URL pública del archivo subido
    const { data: urlData } = supabase
      .storage
      .from('justificantes')
      .getPublicUrl(nombreArchivo);

    const urlArchivo = urlData.publicUrl;

    // 3. Guardar en la tabla
    const { error: insertError } = await supabase
      .from('justificantes_ausencias')
      .insert([{
        usuario_id: userId,
        motivo: motivo,
        fecha: fecha,
        archivo_url: urlArchivo,
        estado: 'pendiente',
        comentario_admin: ''
      }]);

    if (insertError) {
      setMensaje('Error al guardar en la base de datos.');
    } else {
      setMensaje('Justificante enviado correctamente.');
      setMotivo('');
      setFecha('');
      setArchivo(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Subir justificante</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Motivo"
          className="w-full border p-2 rounded"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setArchivo(e.target.files[0])}
          className="w-full"
        />
        {mensaje && <p className="text-blue-600">{mensaje}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
