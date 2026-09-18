import { NextRequest } from "next/server";
import { createGetInvolvedSubmission } from "@/lib/models/GetInvolvedSubmission";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isValidationError,
  parseJsonObject,
  privateJson,
  validateGetInvolvedInput,
  validationResponse,
} from "@/lib/validation";

export async function POST(request: NextRequest) {
  // Rate limit: 5 submissions per 15 minutes per IP
  const ipLimit = await checkRateLimit(request, {
    namespace: "get_involved:ip",
    max: 5,
    windowSeconds: 900,
  });
  if (!ipLimit.allowed) {
    return ipLimit.response;
  }

  try {
    const body = await parseJsonObject(request);
    const input = validateGetInvolvedInput(body);

    // Rate limit: 5 submissions per hour per normalized email
    const emailLimit = await checkRateLimit(request, {
      namespace: "get_involved:email",
      identifier: input.email,
      max: 5,
      windowSeconds: 3600,
    });
    if (!emailLimit.allowed) {
      return emailLimit.response;
    }

    await createGetInvolvedSubmission(input);

    return privateJson(
      {
        success: true,
        message: "Thank you for your submission! We will review it and get back to you soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    console.error("Get involved submission error:", error);
    return privateJson({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
