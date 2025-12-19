import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./useAuth";
import { api } from "../api";

interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface CategoryForm {
  name: string;
}

interface CategoryContentProps {
  createCategory: (form: CategoryForm) => Promise<void>;
  categories: Category[];
  updateCategory: (id: string, form: CategoryForm) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

interface CategoryProviderProps {
  children: ReactNode
}

const CategoryContext = createContext<CategoryContentProps | undefined>(undefined);

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    console.log("carregando categorias");
    getAllCategories().finally(() => setLoading(false));
  }, [token]);

  const getAllCategories = async () => {
    try {
      const { data } = await api.get("/categories/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      console.log(data)
      
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  }

  const createCategory = async (form: CategoryForm) => {
    try {
      const { data } = await api.post("/categories/register", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      console.log(data)
      
      await getAllCategories();
    } catch (err) {
      console.log(err);
    }
  }

  const updateCategory = async (id: string, form: CategoryForm) => {
      try {
        setLoading(true);
  
        console.log("form: ", form);
  
        await api.put(`/categories/edit/${id}`, form, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        await getAllCategories();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  const deleteCategory = async (id: string) => {
    try {
      if (!id) return;

      setLoading(true);

      await api.delete(`/categories/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getAllCategories();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider value={{ createCategory, categories, updateCategory, deleteCategory  }}>
      { children }
    </CategoryContext.Provider>
  );
}

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useAuth must be used inside a AuthProvider");
  }

  return context;
}