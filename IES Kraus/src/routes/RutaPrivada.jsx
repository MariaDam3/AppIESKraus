import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function RutaPrivada({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const comprobarSesion = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUsuario(data.session.user);
      }
      setCargando(false);
    };

    comprobarSesion();
  }, []);

  if (cargando) return <div>Cargando...</div>;

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
}