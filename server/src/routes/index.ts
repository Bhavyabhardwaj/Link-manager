import { Router } from "express";
import authRouter from "./auth.router";
import linkRouter from "./link.router"; 
import { isAuthenticated } from "../middlewares"; // for protected routes
import publicRouter from "./public.router";
import githubAuthRouter from "./githubAuth.router";
import googleAuthRouter from "./googleAuth.router";

const router = Router();


// Define route structure
const apiRoutes = [
  { path: "/auth", route: authRouter },
  { path: "/links", route: linkRouter, isProtected: true },
  { path: "/oauth", route: githubAuthRouter},
  { path: "/oauth", route: googleAuthRouter},
];

// Loop through routes and apply them
apiRoutes.forEach(({ path, route, isProtected }) => {
  if (isProtected) {
    router.use(`/api${path}`, isAuthenticated, route);
  } else {
    router.use(`/api${path}`, route);
  }
});

router.use("/", publicRouter)

export default router;
