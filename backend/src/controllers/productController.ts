import { Request, Response } from "express";
import { Database } from "../db/database";
import { Product } from "../models/product";
import { randomUUID } from "crypto";
import { Category } from "../models/category";

const productRepository = Database.getRepository(Product);
const categoryRepository = Database.getRepository(Category);

type CreateProductBody = {
  name: string;
  price: number;
  amount: number;
  description?: string;
  categoryId: string;
};

export async function createProduct(req: Request, res: Response) {
  try {
    const {
      name,
      price,
      amount,
      description,
      categoryId,
    } = req.body as CreateProductBody;

    const category = await categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const product = {
      id: randomUUID(),
      name,
      price,
      amount,
      description,
      category,
      active: true,
    };

    await productRepository.save(product);

    return res.status(201).json(product);
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating product" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try { 
    const { id } = req.params;

    const {
      name,
      price,
      amount,
      description,
      active,
    } = req.body;

    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.amount = amount ?? product.amount;
    product.description = description ?? product.description;
    product.active = active ?? product.active;

    await productRepository.save(product);

    return res.status(200).json(product);
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating product" });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await productRepository.find({
      relations: ["category"]
    });

    const filteredProducts = products.filter(product => product.amount > 0);

    return res.status(200).json(filteredProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error consulting product" });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error consulting product" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRepository.remove(product);

    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting product" });
  }
}
