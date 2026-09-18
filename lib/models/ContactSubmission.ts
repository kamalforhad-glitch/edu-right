import * as db from "@/lib/db";
import type { ContactPurpose } from "@/lib/types/db";

export type { ContactPurpose };

export interface IContactSubmission {
  id: string;
  name: string;
  email: string;
  purpose: ContactPurpose;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function createContactSubmission(data: {
  name: string;
  email: string;
  purpose: ContactPurpose;
  message: string;
}) {
  return db.createContactSubmission(data);
}

export async function listContactSubmissions(params: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return db.listContactSubmissions(params);
}

export async function getContactSubmissionById(id: string) {
  return db.getContactSubmissionById(id);
}

export async function updateContactSubmissionStatus(id: string, status: string) {
  return db.updateContactSubmissionStatus(id, status);
}
