
import { Card } from "flowbite-react";
// import ProductImage from "../assets/react.svg";

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

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card
      className="max-w-sm"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc=""
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          { product.name }
        </h5>
      </a>
      <div className="mb-5 mt-2.5 flex items-center">
        <p className="text-white">{product.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {`R$ ${product.price}`}
        </span>
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
      </div>
    </Card>
  );
}
