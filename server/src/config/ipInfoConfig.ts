import dotenv from "dotenv";

dotenv.config();
export const IP_INFO_TOKEN = process.env.IP_INFO_TOKEN as string;

if (!IP_INFO_TOKEN) {
  console.warn("Warning: IP_INFO_TOKEN environment variable not set. IP geolocation will use fallback services with limited requests.");
}