import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./useAuth";
import { api } from "../api";

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

interface ProductForm {
  name: string;
  price: number;
  amount: number;
  description: string;
  categoryId: string;
}

interface ProductContentProps {
  createProduct: (form: ProductForm) => Promise<void>;
  products: Product[];
  updateProduct: (id: string, form: ProductForm) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContentProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("carregando produtos");
    getAllProducts().finally(() => setLoading(false));
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await api.get("/products/list");
      console.log("data: ", data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createProduct = async (form: ProductForm) => {
    try {
      await api.post("/products/register", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getAllProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (id: string, form: ProductForm) => {
    try {
      setLoading(true);

      await api.put(`/products/edit/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getAllProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      if (!id) return;

      setLoading(true);

      await api.delete(`/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await getAllProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        products,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used inside a ProductProvider");
  }

  return context;
};