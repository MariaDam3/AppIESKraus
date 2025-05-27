import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Autenticación con Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Correo o contraseña incorrectos');
      return;
    }

    const user = authData.user;
    console.log('USER ID:', user.id);

    // 2. Buscar el perfil en la tabla "perfiles"
    const { data: perfil, error: perfilError } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle(); //single();

    if (perfilError) {
      setError('Perfil no encontrado.');
      return;
    }
    console.log('PERFIL:', perfil);
    console.log('PERFIL ERROR:', perfilError);


    // 3. Redirigir según el rol
    if (perfil.rol === 'Admin') {
      navigate('/admin');
    } else if (perfil.rol === 'Profesor') {
      navigate('/profesor');
    } else {
      setError('Rol no reconocido.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}