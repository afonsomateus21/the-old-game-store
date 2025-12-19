
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export const CustomTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nome do produto</TableHeadCell>
            <TableHeadCell>Tamanho</TableHeadCell>
            <TableHeadCell>Categoria</TableHeadCell>
            <TableHeadCell>Preço</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-bg-white dark:hover:bg-gray-300">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
              Apple MacBook Pro 17"
            </TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>10</TableCell>
            <TableCell>
              <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Editar
              </button>
              <button className="font-medium text-red-400 hover:underline dark:text-red-400 ml-3">
                Apagar
              </button>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-bg-white dark:hover:bg-gray-300">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Microsoft Surface Pro
            </TableCell>
            <TableCell>White</TableCell>
            <TableCell>Laptop PC</TableCell>
            <TableCell>$1999</TableCell>
            <TableCell>10</TableCell>
            <TableCell>
              <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Editar
              </button>
              <button className="font-medium text-red-400 hover:underline dark:text-red-400 ml-3">
                Apagar
              </button>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-bg-white dark:hover:bg-gray-300">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 ">Magic Mouse 2</TableCell>
            <TableCell>Black</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>10</TableCell>
            <TableCell>
              <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Editar
              </button>
              <button className="font-medium text-red-400 hover:underline dark:text-red-400 ml-3">
                Apagar
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
