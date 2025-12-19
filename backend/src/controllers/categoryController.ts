import { randomUUID } from "crypto";
import { Database } from "../db/database";
import { Category } from "../models/category";
import { Request, Response } from "express";

type CategoryBody = {
  name: string;
}

const categoryRepository = Database.getRepository(Category);

export async function createCategory(req: Request, res: Response) {
  try {
    const {
      name
    } = req.body as CategoryBody;

    const category = {
      id: randomUUID(),
      name,
      slug: `/${name.toLowerCase()}`,
      active: true,
    };

    await categoryRepository.save(category);

    return res.status(201).json(category);
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating category" });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try { 
    const { id } = req.params;

    const {
      name,
      active,
    } = req.body;

    const category = await categoryRepository.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name ?? category.name;
    category.active = active ?? category.active;

    await categoryRepository.save(category);

    return res.status(200).json(category);
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating category" });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const category = await categoryRepository.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await categoryRepository.remove(category);

    return res.status(200).json({ message: "Category deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting category" });
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await categoryRepository.find();

    return res.status(200).json(categories);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error consulting category" });
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const category = await categoryRepository.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error consulting category" });
  }
}

export async function getCategoryByName(req: Request, res: Response) {
  try {
    const { name } = req.params;

    const category = await categoryRepository.findOne({ where: { name } });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error consulting category" });
  }
}



