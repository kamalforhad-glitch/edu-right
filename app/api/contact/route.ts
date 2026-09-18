import { NextRequest } from "next/server";
import { createContactSubmission } from "@/lib/models/ContactSubmission";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  isValidationError,
  parseJsonObject,
  privateJson,
  validateContactInput,
  validationResponse,
} from "@/lib/validation";

export async function POST(request: NextRequest) {
  // Rate limit: 5 submissions per 15 minutes per IP
  const ipLimit = await checkRateLimit(request, {
    namespace: "contact:ip",
    max: 5,
    windowSeconds: 900,
  });
  if (!ipLimit.allowed) {
    return ipLimit.response;
  }

  try {
    const body = await parseJsonObject(request);
    const input = validateContactInput(body);

    // Rate limit: 5 submissions per hour per normalized email
    const emailLimit = await checkRateLimit(request, {
      namespace: "contact:email",
      identifier: input.email,
      max: 5,
      windowSeconds: 3600,
    });
    if (!emailLimit.allowed) {
      return emailLimit.response;
    }

    await createContactSubmission(input);

    return privateJson(
      {
        success: true,
        message: "Message sent successfully. We will get back to you soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    if (isValidationError(error)) {
      return privateJson(validationResponse(error), { status: 400 });
    }
    console.error("Contact submission error:", error);
    return privateJson({ error: "Failed to submit message. Please try again." }, { status: 500 });
  }
}
