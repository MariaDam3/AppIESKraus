import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function GestionCuentas() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", email: "" });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  async function obtenerUsuarios() {
    const { data, error } = await supabase
      .from("perfiles")
      .select("*")
      .eq("rol", "profesor");

    if (error) {
      console.error("Error al obtener perfiles:", error.message);
    } else {
      setUsuarios(data);
    }
  }

const API_URL = "https://ujggmasksxftvnufnumz.functions.supabase.co/crear-usuario";

  async function crearUsuario(email, nombre) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nombre }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Error al crear usuario:", result.error);
      alert("Error al crear usuario: " + result.error);
      return;
    }

    alert(`Usuario creado con contraseña: ${result.password}`);
    obtenerUsuarios(); // refrescar lista
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearUsuario(nuevo.email, nuevo.nombre);
    setNuevo({ nombre: "", email: "" });
  };

  return (
    <div>
      <h2>Gestión de Cuentas</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevo.email}
          onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
        />
        <button type="submit">Crear Usuario</button>
      </form>

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - ({usuario.rol})
          </li>
        ))}
      </ul>
    </div>
  );
}