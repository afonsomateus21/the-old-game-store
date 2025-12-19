
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCategory } from "../hooks/useCategory";
import { toast } from "react-toastify";

interface CategoryFormInputs {
  name: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface CategoryProps {
  category?: Category | null;
  onCloseModal: () => void;
}

export const CategoryForm = ({ category, onCloseModal }: CategoryProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryFormInputs>();

  const { updateCategory, createCategory } = useCategory();

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
      });
    }
  }, [category, reset]);

  const onSubmit: SubmitHandler<CategoryFormInputs> = async (data) => {
    try {
      if (category) {
        await updateCategory(category.id, data);

        return toast.success("Categoria atualizada com sucesso!");
      }

      await createCategory(data);

      return toast.success("Categoria criada com sucesso!");
    } catch(error) {
      console.log(error);
      return toast.error("Erro ao criar/atualizar categoria");
    } finally {
      onCloseModal();
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4"
    >
      <h1 className="text-white">Cadastrar categoria</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Nome</Label>
        </div>
        <TextInput 
          id="name" 
          type="text" 
          placeholder="Nome da categoria..." 
          required 
          {...register("name")}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
