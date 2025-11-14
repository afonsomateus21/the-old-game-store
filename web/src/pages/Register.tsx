import { useState } from "react";
import { api } from "../api";
import { Navigate } from "react-router";

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    login: "",
    password: "",
    email: "",
    cpf: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

   const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      console.log("Enviado:", form);
      await api.post("users/register", {...form, cpf_cnpj: form.cpf});
    } catch(error) {
      console.log(error);
    } finally {
      <Navigate to="/" />
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Cadastro de Usuário</h2>

      <div>
        <label className="block mb-1 font-medium">Nome</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

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

      <div>
        <label className="block mb-1 font-medium">E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">CPF</label>
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          maxLength={11}
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