import { apiBaseUrl } from "@/lib/config";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface EnquiryPayload extends ContactPayload {
  vehicleId?: string;
}

export type SubmissionResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "failed"; message: string };

async function submit(path: string, payload: ContactPayload | EnquiryPayload): Promise<SubmissionResult> {
  if (!apiBaseUrl) return { status: "not-configured" };
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Request failed (${response.status}).`);
    return { status: "sent" };
  } catch (error) {
    return {
      status: "failed",
      message: error instanceof Error ? error.message : "The request could not be completed.",
    };
  }
}

export const sendContact = (payload: ContactPayload) => submit("/contact", payload);
export const sendEnquiry = (payload: EnquiryPayload) => submit("/enquiries", payload);
