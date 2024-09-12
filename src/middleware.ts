import type { NextRequest } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
 
export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: "AIzaSyA_8QgueEF9EZ0d0y6H_xRnjWLs_6xNXew",
    cookieName: "AuthToken",
    cookieSignatureKeys: ["Key-Should-Be-at-least-32-bytes-in-length"],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false, // Set this to true on HTTPS environments
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24, // Twelve days
    },
    serviceAccount: {
      projectId: "educart-47b37",
      clientEmail: "firebase-adminsdk-nnw48@your-firebase-project-id.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
    },
  });
}
 
export const config = {
  matcher: ["/api/login", "/api/logout", "/", "/((?!_next|favicon.ico|api|.*\\.).*)"],
};