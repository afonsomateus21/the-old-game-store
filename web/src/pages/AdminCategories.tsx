import { Pagination, Table, TableBody, TableHead, TableCell, TableHeadCell, TableRow, Button } from "flowbite-react";
import { CustomTable } from "../components/CustomTable";
import { useState } from "react";
import { useCategory } from "../hooks/useCategory";
import { RegisterModal } from "../components/RegisterModal";
import { CategoryForm } from "../components/CategoryForm";

interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export const AdminCategories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { categories, updateCategory, deleteCategory } = useCategory();
  const onPageChange = (page: number) => setCurrentPage(page);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const onCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
  }

  const handleUpdate = (category: Category) => {
    setOpenModal(true);
    setSelectedCategory(category);
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
            <TableHeadCell>Nome da categoria</TableHeadCell>
            <TableHeadCell>Slug</TableHeadCell>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
            categories.map((category) => (
              <TableRow 
                key={category.id}
                className="bg-white dark:border-gray-700 dark:bg-bg-white dark:hover:bg-gray-300">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
                  {category.name}
                </TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.active ? <span>Ativo</span> : <span>Inativo</span>}</TableCell>
                <TableCell>
                  <button 
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={ () => handleUpdate(category) }
                  >
                    Editar
                  </button>
                  <button 
                    className="font-medium text-red-400 hover:underline dark:text-red-400 ml-3"
                    onClick={ () => deleteCategory(category.id) }
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
        <CategoryForm category={selectedCategory} onCloseModal={onCloseModal} />
      </RegisterModal>
  </div>
  );
}