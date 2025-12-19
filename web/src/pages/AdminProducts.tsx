import { Button, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { RegisterModal } from "../components/RegisterModal";
import { ProductForm } from "../components/ProductForm";

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

export const AdminProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, deleteProduct } = useProduct();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const onPageChange = (page: number) => setCurrentPage(page);

  const onCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  }

  const handleUpdate = (product: Product) => {
    setOpenModal(true);
    setSelectedProduct(product);
  }

  return (
    <div className="h-full">
      <Button 
        className="absolute -top-14 right-0"
        onClick={ () => setOpenModal(true) }
      >
        Cadastrar Novo
      </Button>
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nome do produto</TableHeadCell>
            <TableHeadCell>Categoria</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
            products.map((product) => (
              <TableRow 
                key={product.id}
                className="bg-white dark:border-gray-700 dark:bg-bg-white dark:hover:bg-gray-300"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
                  {product.name}
                </TableCell>
                <TableCell>{product.category?.name ?? <span>Sem categoria</span>}</TableCell>
                <TableCell>{`R$ ${product.price}`}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>
                  <button 
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => handleUpdate(product)}
                  >
                    Editar
                  </button>
                  <button 
                    className="font-medium text-red-400 hover:underline dark:text-red-400 ml-3"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Apagar
                  </button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={currentPage} totalPages={1} onPageChange={onPageChange} />
      </div>
      <RegisterModal openModal={openModal} onCloseModal={onCloseModal}>
        <ProductForm product={selectedProduct} onCloseModal={onCloseModal} />
      </RegisterModal>
    </div>
  );
}