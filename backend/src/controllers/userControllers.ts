import { randomUUID } from "crypto";
import { Database } from "../db/database";
import { User } from "../models/user";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const userRepository = Database.getRepository(User);

export async function createUser(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      cpf_cnpj,
      is_admin,
      login,
      password
    } = req.body as User;

    const user = userRepository.create({
      id: randomUUID(),
      name,
      email,
      cpf_cnpj,
      is_admin,
      login,
      password,
    });

    await userRepository.save(user);

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
}

export async function login(req: Request, res: Response) {
  const { login, password } = req.body;

  const user: User | null = await userRepository.findOne({ where: { login } });

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const passwordMatch = password === user.password;

  if (!passwordMatch) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { id: user?.id, email: user?.email, isAdmin: user?.is_admin },
    process.env.JWT_SECRET!,
    { expiresIn: "15h" }
  );

  return res.json({ token });
}

export async function getProfile(req: Request, res: Response) {
  console.log(req.user.email)
  const user: User | null = await userRepository.findOne({ where: { email: req.user.email } });

  return res.status(200).json({
    user
  });
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      cpf_cnpj,
      login,
      password
    } = req.body;

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.cpf_cnpj = cpf_cnpj ?? user.cpf_cnpj;
    user.login = login ?? user.login;
    user.password = password ?? user.password;

    await userRepository.save(user);

    return res.status(200).json(user);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepository.remove(user);

    return res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting user" });
  }
}


