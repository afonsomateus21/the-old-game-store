
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useProduct } from "../hooks/useProduct";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCategory } from "../hooks/useCategory";

interface ProductFormInputs {
  name: string;
  amount: number;
  price: number;
  description: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
  description: string;
  active: boolean;
  category: Category | null;
}

interface ProductFormProps {
  product?: Product | null;
  onCloseModal: () => void;
}

export const ProductForm = ({ product, onCloseModal }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>()

  const { updateProduct, createProduct } = useProduct();
  const { categories  } = useCategory();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        amount: product.amount,
        price: product.price,
        description: product.description,
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      if (product) {
        await updateProduct(product.id, data);

        return toast.success("Categoria atualizada com sucesso!");
      }

      await createProduct(data);

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
      <h1 className="text-white">Cadastrar produto</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Nome</Label>
        </div>
        <TextInput 
          id="name" 
          type="text" 
          placeholder="Nome do produto..." 
          required 
          {...register("name")}
        />
      </div>
      <div className="w-full flex gap-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="amount">Quantidade</Label>
          </div>
          <TextInput 
            id="amount" 
            type="number" 
            placeholder="Quantidade..." 
            required 
            {...register("amount")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price">Preço</Label>
          </div>
          <TextInput 
            id="price" 
            type="number" 
            placeholder="Preço..." 
            required 
            {...register("price")}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category">Categoria</Label>
        </div>
        <Select 
          id="category" 
          required
          {...register("categoryId")}
        >
          <option value="">Selecione uma categoria</option>
          {
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          }
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description">Descrição</Label>
        </div>
        <Textarea 
          id="description" 
          placeholder="Digite a descrição..." 
          required 
          rows={4} 
          {...register("description")}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
