import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate } from "react-router";

export const Customer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    login: "",
    cpfCnpj: "",
  });
  const [token, setToken] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token") || '';
        setToken(token);
        const { data } = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        console.log(data)
        setForm({
          name: data.user.name,
          email: data.user.email,
          login: data.user.login,
          cpfCnpj: data.user.cpf_cnpj
        });
      } catch (err) {
        console.log(err);
      }
    };
    loadUser();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await api.put("/users/profile/update", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja apagar seu perfil?")) return;

    try {
      await api.delete("/users/profile/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded-xl space-y-6">
      <h1 className="text-4xl font-bold text-center">Home Cliente</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Login</label>
          <input
            type="text"
            name="login"
            value={form.login}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Cpf</label>
          <input
            type="text"
            name="cpfCnpj"
            value={form.cpfCnpj}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Salvar Alterações
        </button>
      </form>

      <hr />

      <div className="flex flex-col space-y-3">
        <button
          onClick={handleDelete}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
        >
          Apagar Perfil
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
