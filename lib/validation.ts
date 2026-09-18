import {
  sanitizeContentInput,
  type ContentType,
  type UserRole,
} from "@/lib/types/db";
import { NextResponse } from "next/server";

export function privateJson<T>(body: T, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "private, no-store");
  return NextResponse.json(body, { ...init, headers });
}

export const CONTENT_TYPES: readonly ContentType[] = [
  "news",
  "event",
  "gallery",
  "research",
  "advocacy",
  "parliament",
  "project",
];

export const USER_ROLES: readonly UserRole[] = ["admin", "superadmin"];
export const PROJECT_STATUSES = ["upcoming", "ongoing", "completed"] as const;

export class ValidationError extends Error {
  constructor(message = "Invalid request") {
    super(message);
    this.name = "ValidationError";
  }
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function validationResponse(error: unknown) {
  return {
    error: isValidationError(error) ? error.message : "Invalid request",
  };
}

export async function parseJsonObject(request: Request): Promise<Record<string, unknown>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new ValidationError("Invalid request body");
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ValidationError("Request body must be a JSON object");
  }

  return body as Record<string, unknown>;
}

export function isUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

export function requireUuid(value: unknown, field = "id"): string {
  if (!isUuid(value)) {
    throw new ValidationError(`Invalid ${field}`);
  }
  return value;
}

function requiredString(
  value: unknown,
  field: string,
  maxLength: number,
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError(`${field} is required`);
  }
  const normalized = value.trim();
  if (normalized.length > maxLength) {
    throw new ValidationError(`${field} is too long`);
  }
  return normalized;
}

function optionalString(
  value: unknown,
  field: string,
  maxLength: number,
): string | null {
  if (value === null) return null;
  if (typeof value !== "string") {
    throw new ValidationError(`${field} must be a string`);
  }
  if (value.length > maxLength) {
    throw new ValidationError(`${field} is too long`);
  }
  return value.trim();
}

function optionalBoolean(value: unknown, field: string): boolean | null {
  if (value === null) return null;
  if (typeof value !== "boolean") {
    throw new ValidationError(`${field} must be a boolean`);
  }
  return value;
}

function optionalNonNegativeInteger(
  value: unknown,
  field: string,
  maximum = 1_000_000_000,
): number | null {
  if (value === null) return null;
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    !Number.isInteger(value) ||
    value < 0 ||
    value > maximum
  ) {
    throw new ValidationError(`${field} must be a non-negative integer`);
  }
  return value;
}

function optionalStringArray(
  value: unknown,
  field: string,
  maxItems: number,
  maxItemLength: number,
): string[] | null {
  if (value === null) return null;
  if (!Array.isArray(value) || value.length > maxItems) {
    throw new ValidationError(`${field} must be an array with at most ${maxItems} items`);
  }
  return value.map((item) => {
    if (typeof item !== "string" || item.length > maxItemLength) {
      throw new ValidationError(`${field} items must be strings of a valid length`);
    }
    return item.trim();
  });
}

function validHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validImageReference(value: string): boolean {
  return (value.startsWith("/") && !value.startsWith("//")) || validHttpUrl(value);
}

function optionalUrl(
  value: unknown,
  field: string,
  allowLocalPath = false,
): string | null {
  const normalized = optionalString(value, field, 2048);
  if (normalized === null || normalized === "") return normalized;
  if (!(allowLocalPath ? validImageReference(normalized) : validHttpUrl(normalized))) {
    throw new ValidationError(`${field} must be a valid HTTP or HTTPS URL`);
  }
  return normalized;
}

function optionalDate(value: unknown, field: string): string | null {
  const normalized = optionalString(value, field, 100);
  if (normalized === null || normalized === "") return normalized;
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) {
    throw new ValidationError(`${field} must be a valid date`);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    const [year, month, day] = normalized.split("-").map(Number);
    const validDate = new Date(Date.UTC(year, month - 1, day));
    if (
      validDate.getUTCFullYear() !== year ||
      validDate.getUTCMonth() !== month - 1 ||
      validDate.getUTCDate() !== day
    ) {
      throw new ValidationError(`${field} must be a valid date`);
    }
  }
  return normalized;
}

export function isValidEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

export function normalizeEmail(value: unknown): string {
  if (!isValidEmail(value)) {
    throw new ValidationError("Invalid email");
  }
  return value.trim().toLowerCase();
}

export function validatePassword(value: unknown): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new ValidationError("Password is required");
  }
  if (value.length > 128) {
    throw new ValidationError("Password is too long");
  }
  return value;
}

export function validateName(value: unknown): string {
  return requiredString(value, "Name", 100);
}

export function validateUserCreateInput(
  body: Record<string, unknown>,
): { name: string; email: string; password: string; role: UserRole } {
  for (const key of Object.keys(body)) {
    if (!["name", "email", "password", "role"].includes(key)) {
      throw new ValidationError(`Unsupported field: ${key}`);
    }
  }
  return {
    name: validateName(body.name),
    email: normalizeEmail(body.email),
    password: validatePassword(body.password),
    role: validateRole(body.role, "admin"),
  };
}

export function validateUserUpdateInput(
  body: Record<string, unknown>,
): Record<string, unknown> {
  const allowed = ["name", "email", "password", "role", "is_active"];
  for (const key of Object.keys(body)) {
    if (!allowed.includes(key)) {
      throw new ValidationError(`Unsupported field: ${key}`);
    }
  }
  if ("password" in body) {
    throw new ValidationError("Password updates are not supported");
  }
  for (const key of Object.keys(body)) {
    if (!allowed.includes(key)) continue;
    if (key === "name") body[key] = validateName(body[key]);
    if (key === "email") body[key] = normalizeEmail(body[key]);
    if (key === "role") body[key] = validateRole(body[key]);
    if (key === "is_active" && typeof body[key] !== "boolean") {
      throw new ValidationError("is_active must be a boolean");
    }
  }
  if (Object.keys(body).length === 0) {
    throw new ValidationError("At least one update field is required");
  }
  return body;
}

export function validateRole(value: unknown, defaultRole?: UserRole): UserRole {
  const role = value === undefined ? defaultRole : value;
  if (role !== "admin" && role !== "superadmin") {
    throw new ValidationError("Invalid role. Must be 'admin' or 'superadmin'");
  }
  return role;
}

export function validateContentInput(
  body: Record<string, unknown>,
  { partial = false }: { partial?: boolean } = {},
): Record<string, unknown> {
  const protectedFields = ["id", "author_id", "created_at", "updated_at"];
  const forbiddenFields = ["role", "user_id", "password", "owner_id"];
  for (const field of protectedFields) {
    if (field in body) {
      throw new ValidationError(`${field} cannot be modified`);
    }
  }
  for (const field of forbiddenFields) {
    if (field in body) throw new ValidationError(`${field} is not supported`);
  }

  const input = sanitizeContentInput(body);
  if (!partial) {
    if (!("type" in input)) throw new ValidationError("Type is required");
    if (!("title" in input)) throw new ValidationError("Title is required");
    if (!("description" in input)) {
      throw new ValidationError("Description is required");
    }
  }

  if ("type" in input) {
    if (!CONTENT_TYPES.includes(input.type as ContentType)) {
      throw new ValidationError("Invalid content type");
    }
  }

  const stringFields: Record<string, number> = {
    title: 300,
    title_bn: 300,
    description: 5000,
    description_bn: 5000,
    content: 100000,
    content_bn: 100000,
    category: 100,
    event_location: 300,
    event_location_bn: 300,
    source: 2048,
  };
  for (const [field, maxLength] of Object.entries(stringFields)) {
    if (!(field in input)) continue;
    const value =
      field === "title" || field === "description"
        ? requiredString(input[field], field, maxLength)
        : optionalString(input[field], field, maxLength);
    input[field] = value;
  }

  if ("slug" in input) {
    const slug = requiredString(input.slug, "Slug", 200);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new ValidationError("Slug must contain lowercase letters, numbers, and hyphens");
    }
    input.slug = slug;
  }
  if ("featured_image" in input) {
    input.featured_image = optionalUrl(input.featured_image, "Featured image", true);
  }
  if ("external_link" in input) {
    input.external_link = optionalUrl(input.external_link, "External link");
  }
  if ("images" in input) {
    const images = optionalStringArray(input.images, "Images", 30, 2048);
    if (images) {
      for (const image of images) {
        if (!validImageReference(image)) {
          throw new ValidationError("Images must contain valid image URLs or local paths");
        }
      }
    }
    input.images = images;
  }
  if ("tags" in input) input.tags = optionalStringArray(input.tags, "Tags", 30, 100);
  for (const field of ["event_date", "event_end_date", "publish_date"]) {
    if (field in input) input[field] = optionalDate(input[field], field);
  }
  if ("expected_attendees" in input) {
    input.expected_attendees = optionalNonNegativeInteger(
      input.expected_attendees,
      "Expected attendees",
    );
  }
  if ("display_order" in input) {
    input.display_order = optionalNonNegativeInteger(input.display_order, "Display order");
  }
  for (const field of ["is_published", "is_featured"]) {
    if (field in input) input[field] = optionalBoolean(input[field], field);
  }
  if ("status" in input) {
    const status = optionalString(input.status, "Status", 30);
    if (status !== null && status !== "" && !PROJECT_STATUSES.includes(status as (typeof PROJECT_STATUSES)[number])) {
      throw new ValidationError("Invalid status");
    }
    input.status = status;
  }

  return input;
}

export function parsePagination(searchParams: URLSearchParams) {
  const parse = (field: string, fallback: number, minimum: number, maximum: number) => {
    const raw = searchParams.get(field);
    if (raw === null || raw === "") return fallback;
    if (!/^\d+$/.test(raw)) throw new ValidationError(`Invalid ${field}`);
    const value = Number(raw);
    if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
      throw new ValidationError(`Invalid ${field}`);
    }
    return value;
  };

  return {
    page: parse("page", 1, 1, 1_000_000),
    limit: parse("limit", 20, 1, 100),
  };
}

export function parseOptionalBooleanQuery(
  searchParams: URLSearchParams,
  field: string,
): string | undefined {
  const value = searchParams.get(field) ?? undefined;
  if (value !== undefined && value !== "true" && value !== "false") {
    throw new ValidationError(`Invalid ${field}`);
  }
  return value;
}

export function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "23505"
  );
}