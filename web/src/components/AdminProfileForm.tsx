
import { Button, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { CustomToast } from "./CustomToast";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface AdminProfileFormInputs {
  name: string;
  login: string;
  email: string;
  // cpfCnpj: string;
}

export const AdminProfileForm = () => {
  const { user, updateUser, loading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AdminProfileFormInputs>()

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        login: user.login,
      });
    }
  }, [user, reset]);


  const onSubmit: SubmitHandler<AdminProfileFormInputs> = async (data) => {
    try {
      console.log(data);
      await updateUser(data);
      toast.success("Usuário atualizado!")
    } catch(error) {
      console.log(error);
      toast.error("Erro ao atualizar usuário")
    }
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex max-w-md flex-col gap-4"
      >
        <h1 className="text-black">Editar cadastro</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Nome</Label>
          </div>
          <TextInput 
            // defaultValue={user?.name}
            id="name" 
            type="text" 
            placeholder="Nome..." 
            required 
            {...register("name")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput 
            // defaultValue={user?.email}
            id="email" 
            type="email" 
            placeholder="Email..." 
            required 
            {...register("email")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="login">Login</Label>
          </div>
          <TextInput 
            // defaultValue={user?.login}
            id="login" 
            type="text" 
            placeholder="Login..." 
            required 
            {...register("login")}
          />
        </div>
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="cpf">CPF</Label>
          </div>
          <TextInput 
            value={user?.cpfCnpj}
            id="cpf" 
            type="text" 
            placeholder="CPF..." 
            required 
            {...register("cpfCnpj")}
          />
        </div> */}
        <Button type="submit">
          Enviar
        </Button>
      </form>
    </>
  );
}
