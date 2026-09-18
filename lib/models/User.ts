import bcryptjs from "bcryptjs";
import * as db from "@/lib/db";
import type { UserRole } from "@/lib/types/db";

export type { UserRole };

export interface IUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IUserSafe {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function comparePassword(
  candidatePassword: string,
  passwordHash: string,
): Promise<boolean> {
  return bcryptjs.compare(candidatePassword, passwordHash);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(12);
  return bcryptjs.hash(password, salt);
}

export async function findActiveUserByEmailWithPassword(
  email: string,
): Promise<IUser | null> {
  return db.findUserByEmailWithPassword(email);
}

export async function findExistingUserByEmail(
  email: string,
): Promise<IUserSafe | null> {
  return db.findUserByEmail(email);
}

export async function getUserCount(): Promise<number> {
  return db.countUsers();
}

export async function createNewUser(data: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  is_active?: boolean;
}): Promise<IUserSafe> {
  const password_hash = await hashPassword(data.password);
  return db.createUser({
    name: data.name,
    email: data.email,
    password_hash,
    role: data.role,
    is_active: data.is_active,
  });
}

export async function getAllUsers(): Promise<IUserSafe[]> {
  return db.getUsers();
}

export async function getUserById(id: string): Promise<IUserSafe | null> {
  return db.getUserById(id);
}

export async function updateUserById(
  id: string,
  updates: Record<string, unknown>,
): Promise<IUserSafe | null> {
  return db.updateUser(id, updates);
}

export async function deleteUserById(id: string): Promise<boolean> {
  return db.deleteUser(id);
}

export async function userHasContent(userId: string): Promise<boolean> {
  return db.userHasContent(userId);
}
