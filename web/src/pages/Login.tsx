import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  isAdmin: boolean;
  email: string;
  id: string 
}

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async  (e: any) => {
    try {
      e.preventDefault();
      console.log("Enviado:", form);
      const response = await api.post("users/login", form);
      console.log(response.data.token);
      const token = response.data.token;
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        localStorage.setItem("token", response.data.token);
        console.log(decoded)
        return navigate(decoded.isAdmin ? "/admin/profile" : "/profile");
      }
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Login de Usuário</h2>

      <div>
        <label className="block mb-1 font-medium">Login</label>
        <input
          type="text"
          name="login"
          value={form.login}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
      >
        Enviar
      </button>
    </form>
  );
}