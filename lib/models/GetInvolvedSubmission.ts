import * as db from "@/lib/db";
import type { GetInvolvedTopicArea } from "@/lib/types/db";

export type { GetInvolvedTopicArea };

export interface IGetInvolvedSubmission {
  id: string;
  name: string;
  email: string;
  topic_area: GetInvolvedTopicArea;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function createGetInvolvedSubmission(data: {
  name: string;
  email: string;
  topic_area: GetInvolvedTopicArea;
  message: string;
}) {
  return db.createGetInvolvedSubmission(data);
}

export async function listGetInvolvedSubmissions(params: {
  page?: number;
  limit?: number;
  status?: string;
  topic_area?: string;
}) {
  return db.listGetInvolvedSubmissions(params);
}

export async function getGetInvolvedSubmissionById(id: string) {
  return db.getGetInvolvedSubmissionById(id);
}

export async function updateGetInvolvedSubmissionStatus(id: string, status: string) {
  return db.updateGetInvolvedSubmissionStatus(id, status);
}
