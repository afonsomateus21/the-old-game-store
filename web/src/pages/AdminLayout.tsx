import { Button } from "flowbite-react";
import { AdminSidebar } from "../components/AdminSidebar";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { RegisterModal } from "../components/RegisterModal";
import { ProductForm } from "../components/ProductForm";
import { CategoryForm } from "../components/CategoryForm";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export const AdminLayout = () => {
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteUser } = useAuth();

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      toast.success("Usuário removido com sucesso!");
      return navigate("/login");
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex bg-gray-200">
      <AdminSidebar />
      <main className="flex-1 flex flex-col justify-center items-center">
        <div className="rounded-2xl shadow-xxs shadow-black h-[600px] w-[1200px] relative">
          {
            location.pathname.includes("admin/profile") ?
            <Button 
              color="red"
              className="absolute -top-14 right-0"
              onClick={ handleDeleteUser }
            >
              Apagar Perfil
            </Button> :
            <Button 
              className="absolute -top-14 right-0"
              onClick={ () => setOpenModal(true) }
            >
              Cadastrar Novo
            </Button>
          }
          <Outlet />
        </div>
      </main>
      {/* <RegisterModal openModal={openModal} onCloseModal={onCloseModal}>
        { 
          location.pathname.includes("categories") 
            ? <CategoryForm />
            : <ProductForm /> 
        }
      </RegisterModal> */}
    </div>
  );
}