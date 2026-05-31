import { onRequest as apiHandler } from "./api/[[path]].js";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    return apiHandler(context);
  }
  return context.next();
}
