import { handleContactRequest } from "./contact-service.js";

export default async function handler(req, res) {
  return handleContactRequest(req, res);
}
